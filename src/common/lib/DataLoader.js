import { Component } from 'react';
import { object } from 'prop-types';
/* eslint-disable no-await-in-loop, no-unused-expressions, no-plusplus */
import { withRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';

import routes from '../routes';

export const fetchData = (store, location) => {
  const branch = matchRoutes(routes, location);

  const sequence = async (_branch) => {
    for (let i = 0; i < _branch.length; i++) {
      const { route, match } = _branch[i];
      if (((route || {}).component || {}).need) {
        route.component.need(store, match).length
          ? await Promise.all(route.component.need(store, match))
          : await route.component.need(store, match);
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
