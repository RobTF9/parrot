import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CreateAccount from './Authentication/CreateAccount';
import SignIn from './Authentication/SignIn';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/">
          <Redirect to="/create-account" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
