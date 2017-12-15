export const error = (state = {}, action) => {
  if (action.type === '__IronApp__/Error') {
    return action.data;
  } else if (action.type === '__IronApp__/Error:clear') {
    return {};
  }

  return state;
};