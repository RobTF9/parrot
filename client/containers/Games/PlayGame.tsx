import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getGame } from '../../api/resources/game';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Container } from '../../styles/Layout.styles';
import capitalize from '../../utils/capitalize';
import { GAME_TYPE } from '../../utils/constants';

interface ResultSubmission {
  game: string;
  score: {
    correct: string[];
    total: number;
  };
  finished: boolean;
  items: Array<
    ItemResource | { attempts: number; correct: boolean; skipped: boolean }
  >;
}

const PlayGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, gameLoading] = getGame(id);

  const [result, setResult] = useState<ResultSubmission>();

  // useEffect(() => {
  //   if (game) {
  //     setResult({
  //       game: game.data._id,
  //       score: {
  //         correct: [],
  //         total: game.data.items.length,
  //       },
  //       finished: false,
  //       // items: game.data.items.map((item) => ({ ...item })),
  //     });
  //   }
  // }, [game]);

  return (
    <Container>
      {gameLoading && <Loading bg />}
      {game && (
        <>
          <PageHeader title={capitalize(game.data.name)}>
            <Link to="/games">Back</Link>
          </PageHeader>
          {game.data.mode === GAME_TYPE.CONVERSATION && <div>Conversation</div>}
          {game.data.mode === GAME_TYPE.GRID && <div>Grid</div>}
          {game.data.mode === GAME_TYPE.SEQUENCE && <div>Sequence</div>}
        </>
      )}
    </Container>
  );
};

export default PlayGame;
