import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'cookies-js';
import io from 'socket.io-client';
import { getCookiesMiddleware } from 'redux-cookies';
import socketMiddleware from './middlewares/socket';

import rootReducer from './reducers';

const socketCli = io('http://localhost:3000');

export default function configureStore(initialState = {}) {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        getCookiesMiddleware(Cookies),
        socketMiddleware(socketCli, 'vouprosocket/'),
      ),
    ),
  );

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
