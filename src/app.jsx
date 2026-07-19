import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from 'material-ui/CssBaseline';

import AppRouter from './routers/AppRouter';
import { TMDBConfigProvider } from './context/TMDBConfigContext';

const jsx = (
  <div>
    <CssBaseline />
    <TMDBConfigProvider>
      <AppRouter />
    </TMDBConfigProvider>
  </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
