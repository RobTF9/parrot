import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getResult, updateResult } from '../../api/resources/results';
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
  const { id } = useParams<{ id: string }>();

  const [result, resultLoading] = getResult(id);
  const [update, updateLoading] = updateResult(result?.data._id, (res) => {
    if (res.data?.finished) {
      setTimeout(() => {
        showMessage({
          visible: true,
          message: 'Game completed, well done!',
          type: 'success',
        });
        setTimeout(() => {
          push(`/games/${result?.data.game._id}`);
        }, 3000);
      }, 1000);
    }
  });

  return (
    <Container>
      {(resultLoading || updateLoading) && <Loading bg />}
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
