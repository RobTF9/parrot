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
import GameList from '../pages/GameList';

const Authenticated: React.FC = () => {
  const [parrots] = getParrots();
  const { parrot } = useParrotContext();
  const noParrots = parrots && parrots.data.length === 0;

  if (noParrots) return <CreateAParrot />;
  if (!parrot) return <PickAParrot />;

  return (
    <>
      <Navigation
        {...{
          links: [
            { to: '/', text: 'Home' },
            { to: '/games', text: 'Games' },
            { to: '/parrot', text: 'Create parrot' },
          ],
        }}
      />
      <Switch>
        <Route path="/games">
          <GameList />
        </Route>
        <Route path="/parrot">
          <CreateAParrot />
        </Route>
        <Route path="/pick">
          <PickAParrot />
        </Route>
        <Route path="/phrase">
          <AddAPhrase />
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
