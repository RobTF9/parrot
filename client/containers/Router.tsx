import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAuthContext } from '../context/Auth';
import { useLexiconContext } from '../context/Lexicon';
import { Loading } from '../styles/Animations.styles';
import Profile from './Account/Account';
import NoLexicon from './Account/NoLexicon';
import CreateAccount from './Authentication/CreateAccount';
import ForgotPassword from './Authentication/ForgotPassword';
import ResetPassword from './Authentication/ResetPassword';
import SignIn from './Authentication/SignIn';

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();
  const { lexicon } = useLexiconContext();

  if (authenticated === undefined) {
    return <Loading bg />;
  }

  return (
    <>
      <Navigation {...{ authenticated, lexicon }} />
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
    </>
  );
};

export default Router;
