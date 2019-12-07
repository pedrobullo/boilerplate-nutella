Boilerplate Nutella
=====================

<p align="center">
  <img width="150" height="100" src="https://github.com/pedrobullo/boilerplate-nutella/blob/master/public/nutella.png">
</p>

<center>Cheio de modinha e açucar</center>

# Goal
Clean environment, Code Splitting and Server-Side Rendering (Isomorphic/Universal) architecture ~~with lot sugar~~

Hooks ready.

# Installation
```
# Development
yarn install
yarn start
open http://localhost:3000

# Production
yarn install
yarn production
open http://localhost:5000

# Docker (Production)
docker-compose up
open http://localhost:5000
```

# Code Splitting

This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. - Webpack
Why? Code-splitting forces you to think modular-first, your first-render bundle size surely will get a huge drop.

The magic: [react-loadable](https://github.com/jamiebuilds/react-loadable)

Target: [Loadable Component](https://www.smooth-code.com/open-source/loadable-components/).
Currently they dont have a way to access Component.need directly [(link to issue)](https://github.com/smooth-code/loadable-components/issues/128#issuecomment-434683737), our approach doesnt work :(, so we cant use right now.

# Razzle
Razzle is a tool that abstracts all complex configuration needed for SSR into a single dependency--giving you the awesome developer experience of create-react-app, but then leaving the rest of your app's architectural decisions about frameworks, routing, and data fetching up to you.
Pretty customizable (babelrc, lint, webpack.config).
Why? Razzle bases on CRA webpack with SSR feature and you are able to keep your own desired architecture, pretty maintenable and take off huge of your webpack dirty job.

Repo: [Razzle Lib](https://github.com/jaredpalmer/razzle/tree/master/packages/razzle)

# Sass with CSS Modules (Optional)

```js
import style from 'my.scss'

<div className={style.mycontainer} />
```
TODO: Style critical path in Developtment - (Pretty acceptable right now, in production this is already working because extracted css).

# Isomorphic fetching - Data Loader
Once you dont have componentDidMount in server-side we need somehow abstract it.
How? Flagging which dispatches we need to load before rendering our HOC (High-order-component).

## fetchData() looks for RouteComponent.need (nested) additionally route/query params are accessible in .need.

```
- RouteComponent
  - .need()
  - SubRouteComponent
    - .need()
```

Every piece of .need are synchronously resolved in every routing level.
In this case above we make sure to resolve fetchTheme() before fetchPosts()
PS: Same bahevior server-side/client-side

```js
// ./containers/App.js:18
static need = ({ dispatch }, { params, query }) => [
  dispatch(fetchTheme(params)),
];

// ./containers/Posts/index.js:32
static need = ({ dispatch }, { params, query }) => [
  dispatch(fetchPosts(params, query)),
  dispatch(fetchRatings()),
];
```

## DataLoader Component (DataLoader.js)

After first-render we need somehow resolve these RouteComponent.need at client-side.
How? Manually checking for new routes and executing fetchData

```js
// DataLoader.js:64
if (navigated) {
  const { store } = this.context; // eslint-disable-line
  fetchData(store, this.props.location.pathname); // eslint-disable-line
}
```

# Dependencies
- Core
* Webpack 4
* React/Redux
* [react-router](https://github.com/ReactTraining/react-router) - Declarative routing for React v4.
* [Razzle Lib](https://github.com/jaredpalmer/razzle/tree/master/packages/razzle) - SSR Webpack dirty job
* [Loadable Component](https://www.smooth-code.com/open-source/loadable-components/) - Code Splitting/Lazy Loading

- Optional
* [classnames](https://github.com/JedWatson/classnames) - A simple JavaScript utility for conditionally joining classNames together.
* [revalidator](https://github.com/flatiron/revalidator) - JSON schema validator
* [moment](https://github.com/moment/moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
* [sweetalert2](https://github.com/limonte/sweetalert2) - Replacement for JavaScript's popup boxes.
* [react-helmet](https://github.com/nfl/react-helmet) - A document head manager for React

# Plus
* Winston + exception logger

# Resources
* [react-router v4 stuff](https://reacttraining.com/react-router)
* [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
* [universal-react-redux-boilerplate](https://github.com/CrocoDillon/universal-react-redux-boilerplate)
* [isomorphic-boilerplate](https://github.com/mtmr0x/isomorphic-boilerplate)
* [atomic react](https://github.com/diegohaz/arc)
* [react-router guide](https://reacttraining.com/react-router/web/example/route-config)
* [ESLINT](https://github.com/eslint/eslint)

# TODOS:
* Styled component (SSR) - No mistery for this
* Style critical path in Developtment - (Pretty acceptable right now, in production this is already working because extracted css)
