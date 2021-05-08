import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import useQueryParams from '../hooks/useQueryParams';
import AnimatedDrawer from '../components/AnimatedDrawer';

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();
  const { lexicon } = useLexiconContext();
  const params = useQueryParams();
  const { pathname } = useLocation();
  const { push } = useHistory();

  if (authenticated === undefined) {
    return <Loading bg />;
  }

  return (
    <>
      <Navigation {...{ authenticated, lexicon }} />
      {authenticated ? (
        <>
          <AnimatedDrawer
            {...{
              condition: params.get('lexicons') === 'open',
              back: () => push(pathname),
            }}
          >
            <Lexicons />
          </AnimatedDrawer>
          <AnimatedDrawer
            {...{
              condition: params.get('account') === 'open',
              back: () => push(pathname),
            }}
          >
            <Account />
          </AnimatedDrawer>
          <Switch>
            <Route path="/no-lexicon">
              <NoLexicon />
            </Route>
          </Switch>
        </>
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
