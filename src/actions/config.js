import { getConfiguration } from '../tmdb/tmdb';

export const load = config => ({
  type: 'LOAD',
  config
});

export const startLoad = () => {
  return (dispatch, getState) => {
    return getConfiguration().then(config => {
      return dispatch(load(config));
    });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});
