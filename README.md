Boilerplate Nutella
=====================

Cheio de modinha e açucar.

#### Goal
Clean environment / Isomorphic solution / Scaleable / Testable

### TODOS
- Service Worker
- Dynamic Routing Helmet configuration

#### Folder Structure (TBD)
Modular Structure, Domain-based (http://mern.io modular structure)
```
| - Post
  | - __tests__ // all the tests for this module goes here
      | - PostReducer.spec.js
      | - PostActions.spec.js
  | - components // Sub components of this module
      | - PostInput.js
      ...
  | - pages // React Router Pages from this module
      | - PostPage
          | - PostPage.js
          | - PostPage.css
          ...
  | - PostReducer.js
  | - PostActions.js
```

### Usage
```
npm install
npm run dev
open http://localhost:3000
```

### Dependencies
* React
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [babel-loader](https://github.com/babel/babel-loader)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [react-router](https://github.com/ReactTraining/react-router) - Declarative routing for React (v.3.0.5) 
* [classnames](https://github.com/JedWatson/classnames) - A simple JavaScript utility for conditionally joining classNames together. 
* [moment](https://github.com/moment/moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
* [revalidator](https://github.com/flatiron/revalidator) - JSON schema validator
* [sweetalert2](https://github.com/limonte/sweetalert2) - Replacement for JavaScript's popup boxes.
* [react-helmet](https://github.com/nfl/react-helmet) - A document head manager for React

Test
* [ava]
* [redux-ava]

### Resources
* [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
* [universal-react-redux-boilerplate](https://github.com/CrocoDillon/universal-react-redux-boilerplate)
* [isomorphic-boilerplate](https://github.com/mtmr0x/isomorphic-boilerplate)
* [atomic react](https://github.com/diegohaz/arc)
* [react-router guide](https://reacttraining.com/react-router/web/example/route-config)

### Design React Patterns / LINT
* [AirBnB - React](https://github.com/airbnb/javascript/blob/master/react/README.md)
* [ESLINT](https://github.com/eslint/eslint)
