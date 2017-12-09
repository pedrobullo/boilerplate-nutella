import { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';

import routes from '../routes';

export const fetchData = (store, location) => {
  const branch = matchRoutes(routes, location);

  const promises = branch.map(({ route, match }) => {
    if (((route || {}).component || {}).need) {
      return route.component.need(store, match);
    }
    return Promise.resolve(null);
  });
  return Promise.all(promises);
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
