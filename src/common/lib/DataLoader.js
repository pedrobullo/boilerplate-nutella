/* eslint-disable no-restricted-syntax, no-await-in-loop, no-unused-expressions, no-plusplus */
import { Component } from 'react';
import { object } from 'prop-types';
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
      }
    }
  };

  return sequence(branch);
};


/*
DataLoader: https://www.npmjs.com/package/react-router-config
TODO: Migrate to routes.js
*/
class DataLoader extends Component {
  static displayName = 'DataLoader';

  static contextTypes = {
    store: object,
  };

  static propTypes = {
    location: object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location;

    if (navigated) {
      const { store } = this.context;
      fetchData(store, nextProps.location.pathname);
    }
  }

  render() {
    return renderRoutes(routes);
  }
}

export default withRouter(DataLoader);
