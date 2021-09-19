import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getLexicons } from '../data/lexiconResource';
import HomePage from '../pages/HomePage';
import CreateAParrot from '../pages/CreateAParrot';
import AddAPhrase from '../pages/AddAPhrase';
import PickAParrot from '../pages/PickAParrot';
import { useLexiconContext } from '../context/Lexicon';
import Navigation from '../components/Navigation';

const Authenticated: React.FC = () => {
  const [lexicons] = getLexicons();
  const { lexicon } = useLexiconContext();
  const noLexicons = lexicons && lexicons.data.length === 0;

  if (noLexicons) return <CreateAParrot />;
  if (!lexicon) return <PickAParrot />;

  return (
    <>
      <Navigation
        {...{
          links: [
            { to: '/', text: 'Home' },
            { to: '/phrase', text: 'Add phrase' },
            { to: '/pick', text: 'Pick parrot' },
            { to: '/parrot', text: 'Create parrot' },
          ],
        }}
      />
      <Switch>
        <Route path="/parrot">
          <CreateAParrot />
        </Route>
        <Route path="/pick">
          <PickAParrot />
        </Route>
        <Route path="/phrase">
          <AddAPhrase />
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
