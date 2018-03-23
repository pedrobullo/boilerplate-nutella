Boilerplate Nutella
=====================

Cheio de modinha e açucar.

#### Goal
Clean environment / Isomorphic (Universal) / Scaleable / Testable

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

### Webpack Isomorphic Tools / Razzle
- Webpack Isomorphic Tools - Responsible to handle client/server exceptions, including assets. You can check at: [Master branch](https://github.com/pedrobj/boilerplate-nutella/tree/razzle)
- Razzle: lib with ready-to-go universal webpack setup. Pretty customizable. [Razzle Lib](https://github.com/jaredpalmer/razzle/tree/master/packages/razzle)

### Usage
```
yarn install
yarn start
open http://localhost:3000
```

### Dependencies
* Webpack
* React
* Redux
* [Razzle Universal Webpack Lib](https://github.com/jaredpalmer/razzle/tree/master/packages/razzle)
* [react-router](https://github.com/ReactTraining/react-router) - Declarative routing for React v4 :(. (TODO: Remove)
* [classnames](https://github.com/JedWatson/classnames) - A simple JavaScript utility for conditionally joining classNames together. 
* [revalidator](https://github.com/flatiron/revalidator) - JSON schema validator
* [moment](https://github.com/moment/moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
* [sweetalert2](https://github.com/limonte/sweetalert2) - Replacement for JavaScript's popup boxes.
* [react-helmet](https://github.com/nfl/react-helmet) - A document head manager for React

Test environment
* TODO

### Resources
* [react-router v4 stuff](https://reacttraining.com/react-router)
* [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
* [universal-react-redux-boilerplate](https://github.com/CrocoDillon/universal-react-redux-boilerplate)
* [isomorphic-boilerplate](https://github.com/mtmr0x/isomorphic-boilerplate)
* [atomic react](https://github.com/diegohaz/arc)
* [react-router guide](https://reacttraining.com/react-router/web/example/route-config)

### Patterns / LINT
* [AirBnB - React](https://github.com/airbnb/javascript/blob/master/react/README.md)
* [ESLINT](https://github.com/eslint/eslint)
