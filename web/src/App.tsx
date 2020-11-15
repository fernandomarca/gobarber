import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';

import Router from './Routes';

import AppProvider from './hooks';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Router />
    </AppProvider>
    <GlobalStyles />
  </BrowserRouter>
);

export default App;
