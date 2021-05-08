import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAuthContext } from '../context/Auth';
import { useLexiconContext } from '../context/Lexicon';
import { Loading } from '../styles/Animations.styles';
import Account from './Account';
import NoLexicon from './Lexicons/NoLexicon';
import CreateAccount from './Authentication/CreateAccount';
import ForgotPassword from './Authentication/ForgotPassword';
import ResetPassword from './Authentication/ResetPassword';
import SignIn from './Authentication/SignIn';
import Lexicons from './Lexicons/Lexicons';

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
          <Route path="/lexicons">
            <Lexicons />
          </Route>
          <Route path="/">
            <Account />
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
