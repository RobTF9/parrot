import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuthContext } from '../context/Auth';
import Profile from './Account/Profile';
import CreateAccount from './Authentication/CreateAccount';
import SignIn from './Authentication/SignIn';

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();

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
