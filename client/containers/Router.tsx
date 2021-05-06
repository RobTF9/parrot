import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuthContext } from '../context/Auth';
import { Loading } from '../styles/Animations.styles';
import Profile from './Account/Account';
import NoLexicon from './Account/NoLexicon';
import CreateAccount from './Authentication/CreateAccount';
import ForgotPassword from './Authentication/ForgotPassword';
import ResetPassword from './Authentication/ResetPassword';
import SignIn from './Authentication/SignIn';

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();

  if (authenticated === undefined) {
    return <Loading bg />;
  }

  return (
    <BrowserRouter>
      {authenticated ? (
        <Switch>
          <Route path="/no-lexicon">
            <NoLexicon />
          </Route>
          <Route path="/">
            <Profile />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/reset">
            <ResetPassword />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
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
