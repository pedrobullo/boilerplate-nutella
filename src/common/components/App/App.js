import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { renderRoutes as renderSubRoutes } from 'react-router-config';

import styles from './App.scss';

const App = props => (
  <div className={styles.container}>
    <Helmet
      title="Boilerplate Nutella - Test"
      titleTemplate="%s - Boilerplate Nutella"
      meta={[
        { charset: 'utf-8' },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ]} />
    <h1>APP</h1>
    { renderSubRoutes(props.route.routes) }
  </div>
);

App.need = () => {
  console.log('Need from App Test #1');
};

App.propTypes = {
  route: PropTypes.object,
};

export default App;
