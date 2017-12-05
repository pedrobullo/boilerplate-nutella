/*
  React Router - access Router's current components
  Following discussion: https://github.com/ReactTraining/react-router/issues/2817
  Require: React.Component.need (array of dispatches)
*/
export async function fetchComponentData(store, components, params) {
  const needs = components.reduce((prev, current) => (current.need || [])
    .concat((current.WrappedComponent && (current.WrappedComponent.need !== current.need)
      ? current.WrappedComponent.need : []) || [])
    .concat(prev), []);
  const dispatchList = needs.map(n => store.dispatch(n(params)));
  await Promise.all(dispatchList);
}
