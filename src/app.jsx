import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
