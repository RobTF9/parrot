import React from 'react';
import { useLexiconContext } from '../context/Lexicon';
import { getLexicons } from '../data/lexiconResource';
import HomePage from '../pages/HomePage';
import PickAParrot from '../pages/PickAParrot';

const Authenticated: React.FC = () => {
  const { lexicon, activateLexicon } = useLexiconContext();
  const [lexicons, lexiconsLoading] = getLexicons();

  const noLexicons = lexicons && lexicons.data.length === 0;

  if (noLexicons) return <PickAParrot />;

  return <HomePage />;
};

export default Authenticated;
