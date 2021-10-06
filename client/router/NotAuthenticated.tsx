import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SplashPage from '../pages/SplashPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const NotAuthenticated: React.FC = () => (
  <Switch>
    <Route path="/reset">
      <ResetPassword />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/signup">
      <SignUpPage />
    </Route>
    <Route path="/forgot-password">
      <ForgotPassword />
    </Route>
    <Route path="/">
      <SplashPage />
    </Route>
    <Route>
      <Redirect to="/" />
    </Route>
  </Switch>
);

export default NotAuthenticated;
