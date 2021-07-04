import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useAuthContext } from '../context/Auth';
import { useLexiconContext } from '../context/Lexicon';
import { Loading } from '../styles/Animations.styles';
import Account from './Account/Account';
import NoLexicon from './Lexicons/NoLexicon';
import NoActiveLexicon from './Lexicons/NoActiveLexicon';
import CreateAccount from './Authentication/CreateAccount';
import ForgotPassword from './Authentication/ForgotPassword';
import ResetPassword from './Authentication/ResetPassword';
import SignIn from './Authentication/SignIn';
import Lexicons from './Lexicons/Lexicons';
import AnimatedDrawer from '../components/AnimatedDrawer';
import { getLexicons, getShared } from '../api/resources/lexicon';
import { getUnread } from '../api/resources/notifications';
import Words from './Words/Words';
import Sentences from './Sentences/Sentences';
import { getUser } from '../api/resources/user';
import Games from './Games/Games';
import PlayGame from './Games/PlayGame';
import UpdateGame from './Games/UpdateGame';

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
  const [unreadNotifications, unreadLoading] = getUnread();
  const [user, userLoading] = getUser();
  const [modalState, setModalState] = useState<'USER' | 'LEXICON' | 'CLOSED'>(
    'CLOSED'
  );

  if (yoursLoading || sharedLoading || userLoading || unreadLoading)
    return <Loading bg />;

  const noLexicons =
    yourLexicons &&
    yourLexicons.data.length === 0 &&
    sharedLexicons &&
    sharedLexicons.data.length === 0;

  if (noLexicons) return <NoLexicon />;

  if (!lexicon) return <NoActiveLexicon />;

  return (
    <Switch>
      <Route path="/play/:id/:question?">
        <PlayGame />
      </Route>
      <Route path="/">
        <Navigation
          {...{
            lexicon,
            yourLexicons,
            sharedLexicons,
            activateLexicon,
            unreadNotifications,
            user: user?.data,
            setModalState,
          }}
        />
        <AnimatedDrawer
          back={setModalState}
          condition={modalState === 'LEXICON'}
        >
          <Lexicons />
        </AnimatedDrawer>
        <AnimatedDrawer back={setModalState} condition={modalState === 'USER'}>
          <Account />
        </AnimatedDrawer>
        {lexicon && (
          <Switch>
            <Route path="/words">
              <Words />
            </Route>
            <Route path="/sentences">
              <Sentences />
            </Route>
            <Route path="/games/new">
              <Games />
            </Route>
            <Route path="/games/:id/:item?">
              <UpdateGame />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route path="/">
              <Redirect to="/words" />
            </Route>
          </Switch>
        )}
      </Route>
    </Switch>
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
