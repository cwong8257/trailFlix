import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startLoad } from './actions/config';
import CssBaseline from 'material-ui/CssBaseline';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <div>
    <CssBaseline />
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </div>
);

store.dispatch(startLoad()).then(() => {
  console.log(store.getState());
});

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(jsx, document.getElementById('app'));
