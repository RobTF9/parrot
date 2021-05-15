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
import useQueryParams from '../hooks/useQueryParams';
import AnimatedDrawer from '../components/AnimatedDrawer';
import { getLexicons, getShared } from '../api/resources/lexicon';

const NotAuthenticated = () => (
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
);

const Authenticated = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [yourLexicons, yoursLoading] = getLexicons();
  const [sharedLexicons, sharedLoading] = getShared();
  const params = useQueryParams();

  const noLexicons =
    yourLexicons &&
    yourLexicons.data.length === 0 &&
    sharedLexicons &&
    sharedLexicons.data.length === 0 &&
    !yoursLoading &&
    !sharedLoading;

  if (noLexicons) return <NoLexicon />;

  return (
    <>
      <Navigation
        {...{
          lexicon,
          yourLexicons,
          sharedLexicons,
          activateLexicon,
        }}
      />
      <AnimatedDrawer condition={params.get('lexicons') === 'open'}>
        <Lexicons />
      </AnimatedDrawer>
      <AnimatedDrawer condition={params.get('account') === 'open'}>
        <Account />
      </AnimatedDrawer>
    </>
  );
};

const Router: React.FC = () => {
  const { authenticated } = useAuthContext();

  if (authenticated === undefined) {
    return <Loading bg />;
  }

  return authenticated ? <Authenticated /> : <NotAuthenticated />;
};
export default Router;
