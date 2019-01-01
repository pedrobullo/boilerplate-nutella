import React from 'react';
import Cookies from 'cookies';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getCookiesMiddleware } from 'redux-cookies';
import { createStore, applyMiddleware, compose } from 'redux';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import path from 'path';

import appLog from './../appLogs';
import renderHTML from './template';
import DataLoader, { fetchData } from './../../../common/lib/DataLoader';
import rootReducer from '../../../common/redux/reducers';

const statsFile = path.resolve('./build/loadable-stats.json');

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
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['client', 'server'] });

  return fetchData(store, req.url)
    .then(() => {
      const componentHTML = renderToString(
        <Provider store={store}>
          <ChunkExtractorManager extractor={extractor}>
            <StaticRouter location={req.url} context={context}>
              <DataLoader />
            </StaticRouter>
          </ChunkExtractorManager>
        </Provider>,
      );

      try {
      const scriptTags = extractor.getScriptElements();// or extractor.getScriptElements();
      console.log('aaa', scriptTags)
      } catch(e) {
        console.log(e);
      }

      const html = renderHTML(
        componentHTML,
        store.getState(),
        assets,
        // extractor,
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

