import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { renderRoutes as renderSubRoutes } from 'react-router-config';

import './App.scss';

const App = props => (
  <div className="container">
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

// Actions required to provide didMount data for this component to render in SSR.
// Must return array. See more at common/lib/Dataloader.fetchData.
App.need = ({ dispatch }, { params }) => [console.log('Need from App Test #1 with params:', params)]; // eslint-disable-line

App.propTypes = {
  route: PropTypes.object,
};

export default App;
