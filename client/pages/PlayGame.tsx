import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Listener from '../components/Listener';
import Loading from '../components/Loading';
import { getGame, updateGame } from '../data/gameResource';
import { Footer, Main, StretchBlock } from '../styles/Layout.styles';

interface ProgressPhrase extends PhraseResource {
  attempted: boolean;
  correct: boolean;
}

const PlayGame: React.FC = () => {
  const { push } = useHistory();
  const [game, isLoading] = getGame();
  const [update, updateLoading] = updateGame(game?.data._id, (res) => {
    if (res.data) {
      setTimeout(() => push('/'), 2000);
    }
  });

  const [progress, setProgress] = useState<undefined | ProgressPhrase[]>();

  useEffect(() => {
    if (game && !progress) {
      setProgress(
        game.data.phrases.map((phrase) => ({
          ...phrase,
          attempted: false,
          correct: false,
        }))
      );
    }
  }, [game]);

  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    if (progress) {
      progress.forEach((phrase) => {
        if (phrase.attempted) {
          setProgressIndex(progressIndex + 1);
        }
      });
    }
  }, [progress]);

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

  useEffect(() => {
    if (progress) {
      if (progressIndex === progress.length) {
        finishGame();
      }
    }
  }, [progressIndex]);

  if (isLoading || updateLoading) return <Loading />;

  return (
    <Main>
      <StretchBlock>
        {progress &&
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
          )}
      </StretchBlock>
      <Footer>
        {/* Show progress as horizontal bullet points with x or tick */}
      </Footer>
    </Main>
  );
};

export default PlayGame;
