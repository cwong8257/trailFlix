export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD':
      return {
        ...action.config
      };
    case 'UNLOAD':
      return {};
    default:
      return state;
  }
};
