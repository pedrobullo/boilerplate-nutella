/* eslint-disable no-restricted-syntax, no-await-in-loop, no-unused-expressions, no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';

import routes from '../routes';

const parseQueryString = path => {
  const queryString = path.split('?');
  if (queryString[1]) {
    return JSON.parse(`{"${decodeURI(queryString[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"')}"}`);
  }
  return {};
}

// fetchData .need syntax:
// Component.need = ({ dispatch }, { params, query }) => [dispatch1(params), dispatch2(params)...]
export const fetchData = (store, location) => {
  const branch = matchRoutes(routes, location);

  const sequence = async (branches) => {
    for (const _branch of branches) {
      const { route, match } = _branch;
      const locationParams = {
        params: match.params,
        query: parseQueryString(location),
      };

      const need = ((route.component || {}).WrappedComponent || {}).need
      if (need) {
        await Promise.all(need(store, locationParams));
      }
    }
  };
  return sequence(branch);
};


/*
DataLoader: https://www.npmjs.com/package/react-router-config
*/
class DataLoader extends React.Component {
  static displayName = 'DataLoader';

  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const navigated = this.props.location !== prevProps.location;

    if (navigated) {
      const { store } = this.context; // eslint-disable-line
      fetchData(store, this.props.location.pathname); // eslint-disable-line
    }
  }

  render() {
    return renderRoutes(routes);
  }
}

export default withRouter(DataLoader);
