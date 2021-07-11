import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getLexicons } from '../data/lexiconResource';
import HomePage from '../pages/HomePage';
import CreateAParrot from '../pages/CreateAParrot';

const Authenticated: React.FC = () => {
  const [lexicons] = getLexicons();

  const noLexicons = lexicons && lexicons.data.length === 0;

  if (noLexicons) return <CreateAParrot />;

  return (
    <Switch>
      <Route path="/parrot">
        <CreateAParrot />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
};

export default Authenticated;
