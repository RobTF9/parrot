import React, { useState } from 'react';
import Button from '../components/Button';
import Listener from '../components/Listener';
import Loading from '../components/Loading';
import { getGame, updateGame } from '../data/gameResource';
import { Footer, Main, StretchBlock } from '../styles/Layout.styles';

const PlayGame: React.FC = () => {
  const [game, isLoading] = getGame();
  const [update, updateLoading] = updateGame(game?.data._id, (res) => {
    if (res.data) {
      console.log(res.data);
    }
  });

  const [progress, setProgress] = useState(
    game?.data.phrases.map((phrase) => ({
      ...phrase,
      attempted: false,
      correct: false,
    }))
  );

  // stash progress in local storage

  // also stop recreation on server

  const [progressIndex, setProgressIndex] = useState(0);

  const phraseCorrect = (lang: string): void => {
    if (progress) {
      const newArray = [...progress];
      const indexToChange = newArray.findIndex(
        (phrase) => phrase.lang === lang
      );

      newArray[indexToChange] = {
        ...newArray[indexToChange],
        correct: true,
        attempted: true,
      };

      setProgress(newArray);
      setProgressIndex(progressIndex + 1);
    }
  };

  const phraseIncorrect = (lang: string): void => {
    if (progress) {
      const newArray = [...progress];
      const indexToChange = newArray.findIndex(
        (phrase) => phrase.lang === lang
      );

      newArray[indexToChange] = {
        ...newArray[indexToChange],
        attempted: true,
      };

      setProgress(newArray);
      setProgressIndex(progressIndex + 1);
    }
  };

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

  if (isLoading || updateLoading) return <Loading />;

  return (
    <Main>
      <StretchBlock>
        {progress &&
          (progressIndex === progress.length ? (
            <h1>Finished</h1>
          ) : (
            progress.map(
              (phrase, index) =>
                index === progressIndex && (
                  <Listener
                    {...{
                      phrase,
                      phraseCorrect,
                      phraseIncorrect,
                      key: phrase._id,
                    }}
                  />
                )
            )
          ))}
      </StretchBlock>
      <Footer>
        <Button {...{ action: finishGame }}>Finish game</Button>
      </Footer>
    </Main>
  );
};

export default PlayGame;
