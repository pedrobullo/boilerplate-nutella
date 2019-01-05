import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { renderRoutes as renderSubRoutes } from 'react-router-config';

import NavBar from '../../components/NavBar';

import styles from './App.scss';

class App extends React.PureComponent {
  static propTypes = {
    route: PropTypes.object,
  };

  // SSR
  // Actions required for Client/Server to provide didMount data to this component.
  // Must return array. See more at common/lib/Dataloader.fetchData.
  static need = ({ dispatch }, { params }) => [ // eslint-disable-line
    console.log('need: First dispatch from App with params:', params),
    console.log('need: Another dispatch from App with params:', params),
  ];

  render = () => (
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
      <NavBar />
      <div className={styles.content}>
        { renderSubRoutes(this.props.route.routes) }
      </div>
    </div>
  );
};

export default App;
