import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';

import Router from './Routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <GlobalStyles />
  </>
);

export default App;
