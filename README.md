Test Service Shop
=====================

### Objetivo
Esse aplicativo tem como objetivo gerenciar eventos pela cidade. O usuário poderá cadastrar esses itens e visualizá-los através de um mapa. No final, suba seu app para o heroku e envie um email com link para o repo.

### Desenvolvimento de Projeto (Média de esforço x trabalho)
###### Stories:
- Análise de recursos e criação do readme; (1 ponto)
- Desenvolvimento da estrutura; (3 pontos)
    - Criar repositório
    - Configurar WebPack
    - Definição de patterns e estrutura de pasta
    - Definição dos recursos de storage. (localStorage)
- As a user, I want to create an event, so that people can see it in the map or list.
    - Desenvolvimento de actions e reducers (event)
    - Testes redux actions/reducers
    - Implementação OpenLayers
- As a user, I want to update an event, so that I update it if something change.
- As a user, I want to delete an event, so that I can hide the event from the public.
- As a user, I want to see a map with events, so that I can see events close to me and thats not happened yet.
- As a user, I want to see a list of events ordered by date, so that I can see whats happening next.
- As a user, I want to see the name, the address, the date, and a picture of the event, so that I can decide to go.
- As a user, I can click in an event pin on the map, so that I can see information about that event.
- As a user, I want to tag an event, so that I can filter events by tag.
- As a user, I want to click in a tag, so that I can see all events from that tag.

- Desenvolvimento ciclo do redux. (3 pontos)
    - Desenvolvimento de actions e reducers (product / cart)
    - Testes redux actions/reducers
- Desenvolvimento do styleguide (3 pontos)
    - flexboxgrid (responsive)
- Teste de integração (3 pontos)

#### Estrutura de pasta
Estrutura modular, baseada em dominios (http://mern.io modular structure)
```
| - Cart
  | - __tests__ // all the tests for this module goes here
      | - CartReducer.spec.js
      | - CartActions.spec.js
  | - components // Sub components of this module
      | - CartInput.js
      ...
  | - pages // React Router Pages from this module
      | - CartPage
          | - EventPage.js
          | - CartPage.css
          ...
  | - EventReducer.js
  | - EventActions.js
```

### TODOS
- Server Side Rendering
- Localização
- Service Worker
- Feature: pagination, infinite scroll
- Recovery cart from localStorage
- Product Page

### Usage

```
npm install
npm start
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

Test + Integração
* [ava]
* [redux-ava]

### Resources

* [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate)

### Design Patterns / LINT

* [AirBnB - React](https://github.com/airbnb/javascript/blob/master/react/README.md)
* [BEM - CSS](http://getbem.com/introduction/)
* [ESLINT](https://github.com/eslint/eslint)
