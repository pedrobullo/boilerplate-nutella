import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';

import DataLoader from '../common/lib/DataLoader';

import configureStore from '../common/redux/store';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('app');

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <DataLoader />
      </BrowserRouter>
    </Provider>,
    mountApp,
  );
});

// For hot reloading of react components
if (module.hot) {
  console.log('🔁  HMR Reloading - client');
  module.hot.accept();
}
