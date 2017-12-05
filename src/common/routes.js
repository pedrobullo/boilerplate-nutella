/* eslint-disable react/prop-types, react/no-array-index-key */
import React from 'react';
import { Route, Switch } from 'react-router';

import App from './modules/App/App';
import PostListPage from './modules/Post/pages/PostListPage/PostListPage';
import Page404 from './modules/App/components/Page404/Page404';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

// TODO: Nested route object
export function getRoutes() {
  return [
    {
      name: 'home',
      exact: true,
      path: '/',
      component: App,
    },
    {
      name: 'postlist',
      path: '/posts',
      component: PostListPage,
    },
    {
      name: 'admin',
      path: '/admin/',
      requiresAuthentication: true,
      component: PostListPage,
    },
    {
      name: 'PageNotFound',
      label: 'Page not found',
      component: Page404,
    },
  ];
}

export default (
  <App>
    <Switch>
      {getRoutes().map((route, i) => {
        const { component: Component, ...props } = route;
        return (
          <Route
            key={i}
            {...props}
            render={matchProps => (
              <Component {...matchProps} />
            )} />
        );
      })}
    </Switch>
  </App>
);

// TODO: getCompoent
// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
// <Route
//   path="/event"
//   getComponent={
//       (nextState, cb) => {
//         require.ensure([], require => {
//           cb(null, require('./modules/Event/pages/EventPage').default);
//         });
//       }
//     } />
