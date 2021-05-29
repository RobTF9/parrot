import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getResult } from '../../api/resources/results';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';
import capitalize from '../../utils/capitalize';
import { GAME_TYPE } from '../../utils/constants';

const PlayGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, resultLoading] = getResult(id);

  return (
    <Container>
      {resultLoading && <Loading bg />}
      {result && (
        <>
          <PageHeader title={capitalize(result.data.game.name)}>
            <Link to="/games">Back</Link>
          </PageHeader>
          {result.data.game.mode === GAME_TYPE.CONVERSATION && (
            <div>Conversation</div>
          )}
          {result.data.game.mode === GAME_TYPE.GRID && <div>Grid</div>}
          {result.data.game.mode === GAME_TYPE.SEQUENCE && <div>Sequence</div>}
        </>
      )}
    </Container>
  );
};

export default PlayGame;
