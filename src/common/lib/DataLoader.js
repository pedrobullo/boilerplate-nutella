/* eslint-disable no-restricted-syntax, no-await-in-loop, no-unused-expressions, no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';

import routes from '../routes';

// fetchData .need syntax:
// Component.need = ({ dispatch }, { params }) => [dispatch1(params), dispatch2(params)...]
export const fetchData = (store, location) => {
  const branch = matchRoutes(routes, location);

  const sequence = async (branches) => {
    for (const _branch of branches) {
      const { route, match } = _branch;

      if (((route || {}).component || {}).need) {
        await Promise.all(route.component.need(store, match));
      } else if (route.component.preload) {
        await route.component.preload() // Lazy preload (react-loadable)
          .then(component => {
            if (component.default.need) {
              return Promise.all(component.default.need(store, match));
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

  static contextTypes = {
    store: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const navigated = this.props.location !== prevProps.location;

    if (navigated) {
      const { store } = this.context;
      fetchData(store, this.props.location.pathname);
    }
  }

  render() {
    return renderRoutes(routes);
  }
}

export default withRouter(DataLoader);
