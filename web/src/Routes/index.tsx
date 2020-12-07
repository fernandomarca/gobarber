import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

import Dashboard from '../pages/Dashboard';

const Router: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />

    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route path="/forgot-password" component={ForgotPassword} />
  </Switch>
);

export default Router;
