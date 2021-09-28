import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getParrots } from '../data/parrotResource';
import HomePage from '../pages/HomePage';
import CreateAParrot from '../pages/CreateAParrot';
import AddAPhrase from '../pages/AddAPhrase';
import PickAParrot from '../pages/PickAParrot';
import { useParrotContext } from '../context/Parrot';
import Navigation from '../components/Navigation';
import PlayGame from '../pages/PlayGame';
import Games from '../pages/Games';
import ReplayGame from '../pages/ReplayGame';
import { useAuthContext } from '../context/Auth';
import BetaFooter from '../components/BetaFooter';
import EditParrot from '../pages/EditParrot';
import Phrases from '../pages/Phrases';
import EditPhrase from '../pages/EditPhrase';

const Authenticated: React.FC = () => {
  const { signOut } = useAuthContext();
  const [parrots] = getParrots();
  const { parrot } = useParrotContext();
  const noParrots = parrots && parrots.data.length === 0;

  if (noParrots) return <CreateAParrot />;
  if (!parrot) return <PickAParrot />;

  return (
    <>
      <BetaFooter />
      <Navigation
        {...{
          logout: signOut,
          links: [
            { to: '/', text: 'Home' },
            { to: '/phrases', text: 'Phrases' },
            { to: '/games', text: 'Games' },
            { to: '/parrot', text: 'Create parrot' },
          ],
        }}
      />
      <Switch>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/edit">
          <EditParrot />
        </Route>
        <Route path="/parrot">
          <CreateAParrot />
        </Route>
        <Route path="/pick">
          <PickAParrot />
        </Route>
        <Route path="/phrases/:id">
          <EditPhrase />
        </Route>
        <Route path="/phrases">
          <Phrases />
        </Route>
        <Route path="/phrase">
          <AddAPhrase />
        </Route>
        <Route path="/replay/:id">
          <ReplayGame />
        </Route>
        <Route path="/play">
          <PlayGame />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};

export default Authenticated;
