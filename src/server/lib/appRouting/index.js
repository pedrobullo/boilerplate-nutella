import React from 'react';
import Cookies from 'cookies';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getCookiesMiddleware } from 'redux-cookies';
import { createStore, applyMiddleware, compose } from 'redux';

import appLog from './../appLogs';
import renderHTML from './template';
import DataLoader, { fetchData } from './../../../common/lib/DataLoader';
import rootReducer from './../../../common/reducers';

export default function appRouting(req, res, next) {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const context = {};
  const cookies = new Cookies(req, res);
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, getCookiesMiddleware(cookies)),
    ),
  );

  return fetchData(store, req.url)
    .then(() => {
      const componentHTML = renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}>
            <DataLoader />
          </StaticRouter>
        </Provider>,
      );
      const html = renderHTML(
        componentHTML,
        store.getState(),
        webpackIsomorphicTools.assets(),
      );
      return { html };
    })
    .then(({ html }) => {
      if (req.url === '/404') {
        res.status(404).send(html);
        return;
      }
      res.end(html);
      return; // eslint-disable-line
    })
    .catch((error) => {
      const errorString = JSON.stringify({
        message: `Request in ${req.url} failed.`,
        response: error,
      });
      return appLog.error(errorString);
    });
}

