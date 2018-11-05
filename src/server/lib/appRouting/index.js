import React from 'react';
import Cookies from 'cookies';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getCookiesMiddleware } from 'redux-cookies';
import { createStore, applyMiddleware, compose } from 'redux';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import appLog from './../appLogs';
import renderHTML from './template';
import DataLoader, { fetchData } from './../../../common/lib/DataLoader';
import rootReducer from '../../../common/redux/reducers';

import stats from '../../../../build/react-loadable.json';

import { ServerStyleSheet } from 'styled-components';

export default function appRouting(req, res) {
  const context = {};
  const cookies = new Cookies(req, res);
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, getCookiesMiddleware(cookies)),
    )
  );

  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

  return fetchData(store, req.url)
    .then(() => {
      const sheet = new ServerStyleSheet();
      const modules = [];
      const componentHTML = renderToString(
        sheet.collectStyles(
          <Provider store={store}>
            <Capture report={moduleName => modules.push(moduleName)}>
              <StaticRouter location={req.url} context={context}>
                <DataLoader />
              </StaticRouter>
            </Capture>
          </Provider>
        )
      );
      const styleTags = sheet.getStyleTags();

      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter(bundle => typeof bundle === 'object' && bundle.file.endsWith('.js'));

      const html = renderHTML(
        componentHTML,
        store.getState(),
        assets,
        chunks,
        styleTags
      );
      return { html };
    })
    .then(({ html }) => {
      if (context.url) {
        return res.redirect(context.url);
      }
      if (req.url === '/404') {
        return res.status(404).send(html);
      }
      return res.end(html);
    })
    .catch((error) => {
      const errorString = JSON.stringify({
        message: `Request in ${req.url} failed.`,
        response: error,
      });
      return appLog.error(errorString);
    });
}

