import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import DataLoader from './lib/DataLoader';

const App = props => (
  <Provider store={props.store}>
    <BrowserRouter>
      <DataLoader />
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
