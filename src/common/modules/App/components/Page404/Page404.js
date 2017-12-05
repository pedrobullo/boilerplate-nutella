import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Page404 = ({ location }) => (
  <div>
    <Helmet
      title="Service Shop - Test"
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
    <b>{location.pathname}</b> not found.
  </div>
);

Page404.propTypes = {
  location: PropTypes.object,
};

export default Page404;
