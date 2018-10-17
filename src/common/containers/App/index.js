import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { renderRoutes as renderSubRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';

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
    <div className={styles.navbar}>
      <Link className={styles.link} to="/">Home</Link>
      <Link className={styles.link} to="/posts">Post list</Link>
    </div>
    <div className={styles.content}>
      { renderSubRoutes(props.route.routes) }
    </div>
  </div>
);

// SSR
// Actions required for Client/Server to provide didMount data to this component.
// Must return array. See more at common/lib/Dataloader.fetchData.
App.need = ({ dispatch }, { params }) => [ // eslint-disable-line
  console.log('need: First dispatch from App with params:', params),
  console.log('need: Another dispatch from App with params:', params),
];

App.propTypes = {
  route: PropTypes.object,
};

export default App;
