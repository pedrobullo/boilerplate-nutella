/* eslint-disable no-restricted-syntax, no-await-in-loop, no-unused-expressions, no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { ReactReduxContext } from 'react-redux';

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

      if ((route.component || {}).need) {
        await Promise.all(route.component.need(store, locationParams));
      } else if (route.component.preload) {
        await route.component.preload() // Lazy preload (react-loadable)
          .then(component => {
            if (component.default.need) {
              return Promise.all(component.default.need(store, locationParams));
            }
          })
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

  static contextType = ReactReduxContext; // Legacy context workaround

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  _getFullLocation = location => [location.pathname, location.search].filter(String).join('/');

  componentDidUpdate(prevProps) {
    const currentLocation = this._getFullLocation(this.props.location);
    const prevLocation = this._getFullLocation(prevProps.location);
    const navigated = currentLocation !== prevLocation;

    if (navigated) {
      const { store } = this.context;
      fetchData(store, currentLocation);
    }
  }

  render() {
    return renderRoutes(routes);
  }
}

export default withRouter(DataLoader);
