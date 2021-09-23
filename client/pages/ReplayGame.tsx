import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GameTrack from '../components/GameTrack';
import Listener from '../components/Listener';
import Loading from '../components/Loading';
import { getGameById, updateGame } from '../data/gameResource';
import useGameProgress from '../hooks/useGameProgress';
import { Footer, Main, StretchBlock } from '../styles/Layout.styles';

const ReplayGame: React.FC = () => {
  const { push } = useHistory();
  const { id } = useParams<{ id: string }>();
  const [game, isLoading] = getGameById(id);
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

export default ReplayGame;
