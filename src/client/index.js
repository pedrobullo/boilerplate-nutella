import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from '../common/store';

import App from '../common/App';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('app');

hydrate(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  mountApp,
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('../common/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('../common/App').default; // eslint-disable-line global-require
    hydrate(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      mountApp,
    );
  });
}
