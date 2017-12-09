import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'cookies-js';
import { getCookiesMiddleware } from 'redux-cookies';

import rootReducer from './reducers';

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(getCookiesMiddleware(Cookies)),
      // for redux devTools chrome extension
      (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') ?
        window.devToolsExtension() : f => f,
    ),
  );

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
