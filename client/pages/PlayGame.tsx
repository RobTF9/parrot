import React, { useState } from 'react';
import { getGame, updateGame } from '../data/gameResource';
import { Main } from '../styles/Layout.styles';

const PlayGame: React.FC = () => {
  const [game, isLoading] = getGame();
  const [update, updateLoading] = updateGame(game?.data._id);

  const [progress, setProgress] = useState(
    game?.data.phrases.map((phrase) => ({
      ...phrase,
      attempted: false,
      correct: false,
    }))
  );

  const [progressIndex, setProgressIndex] = useState(0);

  const finishGame = () => {
    if (game && progress) {
      update({
        ...game.data,
        results: [
          ...game.data.results,
          {
            correct: [
              ...progress
                .filter(({ correct }) => correct)
                .map(({ _id }) => _id),
            ],
            attempted: [
              ...progress
                .filter(({ attempted }) => attempted)
                .map(({ _id }) => _id),
            ],
            createdAt: `${Date.now()}`,
            played: true,
          },
        ],
      });
    }
  };

  return <Main>{game && <p>{game.data.phrases[0].lang}</p>}</Main>;
};

export default PlayGame;
