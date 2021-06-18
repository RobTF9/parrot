import React from 'react';
import { useParams } from 'react-router-dom';
import { getResult, updateResult } from '../../api/resources/results';
import GridMode from '../../components/GridMode';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';
import { GAME_TYPE } from '../../utils/constants';

const PlayGame: React.FC = () => {
  const { game } = useParams<{ game: string; question: string }>();
  const [result, resultLoading] = getResult(game);
  const [update, updateLoading] = updateResult(result?.data._id);

  return (
    <Container>
      {(resultLoading || updateLoading) && <Loading bg />}
      {result && (
        <>
          {result.data.game.mode === GAME_TYPE.CONVERSATION && (
            <div>Conversation</div>
          )}
          {result.data.game.mode === GAME_TYPE.GRID && (
            <GridMode {...{ result: result.data, update }} />
          )}
          {result.data.game.mode === GAME_TYPE.SEQUENCE && <div>Sequence</div>}
        </>
      )}
    </Container>
  );
};

export default PlayGame;
