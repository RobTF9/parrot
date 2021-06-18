import React from 'react';
import { useParams } from 'react-router-dom';
import AnimatedModal from '../../components/AnimatedModal';
import AnimatedRoute from '../../components/AnimateRoute';
import { getResult, updateResult } from '../../api/resources/results';
import GridMode from '../../components/GridMode';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';
import { GAME_TYPE } from '../../utils/constants';
import Listener from '../../components/Listener';

const PlayGame: React.FC = () => {
  const { game, question } = useParams<{ game: string; question: string }>();
  const [result, resultLoading] = getResult(game);
  const [update, updateLoading] = updateResult(result?.data._id);

  return (
    <Container>
      {resultLoading && <Loading bg />}
      {result && (
        <>
          <AnimatedRoute path={`/play/${result.data.game._id}/:question`}>
            <AnimatedModal back={`/play/${result.data.game._id}`}>
              {updateLoading && <Loading bg />}
              <Listener {...{ result: result.data, id: question, update }} />
            </AnimatedModal>
          </AnimatedRoute>
          {result.data.game.mode === GAME_TYPE.CONVERSATION && (
            <div>Conversation</div>
          )}
          {result.data.game.mode === GAME_TYPE.GRID && (
            <GridMode {...{ result: result.data }} />
          )}
          {result.data.game.mode === GAME_TYPE.SEQUENCE && <div>Sequence</div>}
        </>
      )}
    </Container>
  );
};

export default PlayGame;
