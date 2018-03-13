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
  console.log('🔁  HMR Reloading - client');
  module.hot.accept();
}
