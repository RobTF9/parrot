import React from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../../api/resources/game';
import AnimatedRoute from '../../components/AnimateRoute';
import GameList from '../../components/GameList';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container } from '../../styles/Layout.styles';
import CreateGame from './CreateGame';
import NoGames from './NoGames';

const Games: React.FC = () => {
  const [games, gamesLoading] = getGames();

  return (
    <>
      {games && games.data.length === 0 && <NoGames />}
      <Container>
        <AnimatedRoute path="/games/new">
          <CreateGame />
        </AnimatedRoute>
        <PageHeader title="Games">
          <Button as={Link} to="/games/new">
            Create a new game
          </Button>
        </PageHeader>
        {gamesLoading && <Loading bg />}
        {games && <GameList {...{ games }} />}
      </Container>
    </>
  );
};

export default Games;
