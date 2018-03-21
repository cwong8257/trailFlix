import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import configReducer from '../reducers/config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      config: configReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
