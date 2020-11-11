import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/login" component={SignUp} />
  </Switch>
);

export default Router;
