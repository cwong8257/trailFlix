import { getConfiguration } from '../tmdb/tmdb';

export const load = config => ({
  type: 'LOAD',
  config
});

export const startLoad = () => {
  return () => {
    return getConfiguration();
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});
