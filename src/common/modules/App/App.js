import React from 'react';
import PropTypes from 'prop-types';
// import 'flexboxgrid';
import Helmet from 'react-helmet';

// import './App.scss';
// import './sweetalert2.scss';

const App = props => (
  <div>
    <Helmet
      title="Service Shop - Test a"
      titleTemplate="%s - Service Shop"
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
    <div className="container-fluid">
      <h1>APP</h1>
      {props.children}
    </div>
  </div>
);

App.need = [params => () => console.log('App need params', params), params => () => console.log('App2 need params', params)];

App.propTypes = {
  children: PropTypes.object,
};

export default App;
