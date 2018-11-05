import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { renderRoutes as renderSubRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  border: solid 1px #212121;
  background-color: #222;
`;

const Navbar = styled.div`
  background-color: #212121;
  padding: 0px 10px 10px 0px;
  margin-bottom: 20px;
  > a {
    padding: 10px;
    border-right: solid 1px #555;
  }
`;

const Content = styled.div`
  background-color: #3f3c3c;
  padding: 10px;
`;

const App = props => (
  <React.Fragment>
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
    <GlobalStyles />
    <Container>
      <h1>APP</h1>
      <Navbar>
        <Link style={{ color: '#EEE' }} to="/">Home</Link>
        <Link style={{ color: '#EEE' }} to="/posts">Post list</Link>
      </Navbar>
      <Content>
        { renderSubRoutes(props.route.routes) }
      </Content>
    </Container>
  </React.Fragment>
);

// SSR
// Actions required for Client/Server to provide didMount data to this component.
// Must return array. See more at common/lib/Dataloader.fetchData.
App.need = ({ dispatch }, { params }) => [ // eslint-disable-line
  console.log('need: First dispatch from App with params:', params),
  console.log('need: Another dispatch from App with params:', params),
];

App.propTypes = {
  route: PropTypes.object,
};

export default App;
