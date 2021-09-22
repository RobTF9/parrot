import React from 'react';
import { getGame } from '../data/gameResource';
import { Main } from '../styles/Layout.styles';

const PlayGame: React.FC = () => {
  const [game, isLoading] = getGame();

  return <Main>{game && <p>{game.data.phrases[0].lang}</p>}</Main>;
};

export default PlayGame;
