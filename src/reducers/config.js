export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD':
      return {
        uid: action.uid
      };
    case 'UNLOAD':
      return {};
    default:
      return state;
  }
};
