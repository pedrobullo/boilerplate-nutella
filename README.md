Boilerplate Nutella
=====================

<p align="center">
  <img width="150" height="100" src="https://i.pinimg.com/originals/94/a5/b3/94a5b3383b4fcc04a4c36d0c5a04ab24.png">
</p>

<center>Cheio de modinha e açucar</center>

# Goal
Clean environment, Isomorphic (Universal) architecture

# Razzle
Razzle: lib with ready-to-go (DEV/PROD) universal webpack setup. Pretty customizable (babelrc, lint, webpack.config). [Razzle Lib](https://github.com/jaredpalmer/razzle/tree/master/packages/razzle)

# Usage
```
# Development
yarn install
yarn start
open http://localhost:3000

# Production
yarn install
yarn production
open http://localhost:3000

```

### Example with Webpack Isomorphic Tools (Responsible to handle client/server exceptions, including assets). You can check at: [Master branch](https://github.com/pedrobj/boilerplate-nutella/tree/razzle)

# Dependencies
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

# Resources
* [react-router v4 stuff](https://reacttraining.com/react-router)
* [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)
* [universal-react-redux-boilerplate](https://github.com/CrocoDillon/universal-react-redux-boilerplate)
* [isomorphic-boilerplate](https://github.com/mtmr0x/isomorphic-boilerplate)
* [atomic react](https://github.com/diegohaz/arc)
* [react-router guide](https://reacttraining.com/react-router/web/example/route-config)

# Patterns / LINT
* [AirBnB - React](https://github.com/airbnb/javascript/blob/master/react/README.md)
* [ESLINT](https://github.com/eslint/eslint)

# TODOS:
* Styled component
* Better routing solution
* Tests