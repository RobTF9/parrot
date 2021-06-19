import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  finishResult,
  getResult,
  updateResult,
} from '../../api/resources/results';
import GridMode from '../../components/GridMode';
import Progress from '../../components/Progress';
import SequenceMode from '../../components/SequenceMode';
import { useMessageContext } from '../../context/Message';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';
import { GAME_TYPE } from '../../utils/constants';

const PlayGame: React.FC = () => {
  const { push } = useHistory();
  const { showMessage } = useMessageContext();
  const { game } = useParams<{ game: string; question: string }>();
  const [result, resultLoading] = getResult(game);
  const [update, updateLoading] = updateResult(result?.data._id);
  const [finish, finishLoading] = finishResult(result?.data._id, (res) => {
    if (res.data) {
      setTimeout(() => {
        showMessage({
          visible: true,
          message: 'Game completed, well done!',
          type: 'success',
        });
        setTimeout(() => {
          push('/games');
        }, 3000);
      }, 1000);
    }
  });

  useEffect(() => {
    if (
      result &&
      result.data.items.filter(({ correct, skipped }) => correct || skipped)
        .length === result.data.score.total
    ) {
      finish({ ...result.data, game: result.data.game._id, finished: true });
    }
  }, [result, updateLoading]);

  return (
    <Container>
      {(resultLoading || updateLoading || finishLoading) && <Loading bg />}
      {result && (
        <>
          {result.data.game.mode === GAME_TYPE.GRID && (
            <GridMode {...{ result: result.data, update }} />
          )}
          {result.data.game.mode === GAME_TYPE.SEQUENCE && (
            <SequenceMode {...{ result: result.data, update, updateLoading }} />
          )}
          <Progress {...{ result: result.data }} />
        </>
      )}
    </Container>
  );
};

export default PlayGame;
