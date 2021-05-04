import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuthContext } from '../auth/context';
import Profile from './Account/Profile';
import CreateAccount from './Authentication/CreateAccount';
import SignIn from './Authentication/SignIn';

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();

  if (authenticated === undefined) {
    return <p>Loading</p>;
  }

  return (
    <BrowserRouter>
      {authenticated ? (
        <Switch>
          <Route path="/">
            <Profile />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/">
            <CreateAccount />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Router;
