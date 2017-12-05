import React from 'react';
import Cookies from 'cookies';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getCookiesMiddleware } from 'redux-cookies';
import { createStore, applyMiddleware, compose } from 'redux';

import log from './../logs';
import renderHTML from './template';
import routes, { getRoutes } from './../../common/routes';
import rootReducer from './../../common/reducers';

import { fetchComponentData } from './../_util/fetchData';

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
    applyMiddleware(getCookiesMiddleware(cookies)),
    compose(applyMiddleware(thunkMiddleware)),
  );

  // TODO: HOC array of components
  const currentRoute = getRoutes().find(_ => _.path === req.url) || {};
  if (!currentRoute.component) {
    return next();
  }

  // TODO: Render Error / Redirect
  return fetchComponentData(store, [currentRoute.component], req.params)
    .then(() => {
      const componentHTML = renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}>
            {routes}
          </StaticRouter>
        </Provider>,
      );
      const html = renderHTML(componentHTML, store.getState(), webpackIsomorphicTools.assets());
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
        message: `Request in ${req.location} failed.`,
        response: error,
      });

      if (process.env.logging) {
        return log.error(errorString);
      }
      return console.log(error); // eslint-disable-line
    });
}

