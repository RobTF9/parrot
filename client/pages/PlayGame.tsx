import React from 'react';
import { useHistory } from 'react-router-dom';
import GameTrack from '../components/GameTrack';
import Listener from '../components/Listener';
import Loading from '../components/Loading';
import { useParrotContext } from '../context/Parrot';
import { getGame, updateGame } from '../data/gameResource';
import useGameProgress from '../hooks/useGameProgress';
import { Footer, Main, StretchBlock } from '../styles/Layout.styles';

const PlayGame: React.FC = () => {
  const { parrot } = useParrotContext();
  const { push } = useHistory();
  const [game, isLoading] = getGame();
  const [update, updateLoading] = updateGame(game?.data._id, (res) => {
    if (res.data) {
      setTimeout(() => push('/'), 2000);
    }
  });

  const [
    progressIndex,
    phraseCorrect,
    phraseIncorrect,
    progress,
  ] = useGameProgress(update, game);

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
                    parrot,
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
        {progress && <GameTrack {...{ progress, progressIndex }} />}
      </Footer>
    </Main>
  );
};

export default PlayGame;
