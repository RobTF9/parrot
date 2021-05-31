import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimatedModal from '../../components/AnimatedModal';
import AnimatedRoute from '../../components/AnimateRoute';
import { getResult } from '../../api/resources/results';
import GridMode from '../../components/GameModes/GridMode';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';
import capitalize from '../../utils/capitalize';
import { GAME_TYPE } from '../../utils/constants';

const PlayGame: React.FC = () => {
  const { game, question } = useParams<{ game: string; question: string }>();
  const [result, resultLoading] = getResult(game);

  return (
    <Container>
      {resultLoading && <Loading bg />}
      {result && (
        <>
          <AnimatedRoute path={`/play/${result.data.game._id}/:question`}>
            <AnimatedModal back={`/play/${result.data.game._id}`}>
              {question}
            </AnimatedModal>
          </AnimatedRoute>
          <PageHeader title={capitalize(result.data.game.name)}>
            <Link to="/games">Back</Link>
          </PageHeader>
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
