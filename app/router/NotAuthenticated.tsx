import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SplashPage from '../pages/SplashPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

const NotAuthenticated: React.FC = () => (
  <Switch>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/signup">
      <SignUpPage />
    </Route>
    <Route path="/">
      <SplashPage />
    </Route>
  </Switch>
);

export default NotAuthenticated;
