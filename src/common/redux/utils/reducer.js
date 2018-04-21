export default (initialState, actionHandlers, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(initialState, action) : initialState;
};
