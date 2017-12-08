import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const NotFound = ({ location }) => (
  <div>
    <Helmet title="Page not Found" />
    <b>{location.pathname}</b> not found.
  </div>
);

NotFound.propTypes = {
  location: PropTypes.object,
};

export default NotFound;
