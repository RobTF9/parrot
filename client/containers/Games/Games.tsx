import React from 'react';
import { Link, Switch } from 'react-router-dom';
import { getGames } from '../../api/resources/game';
import AnimatedRoute from '../../components/AnimateRoute';
import GameList from '../../components/GameList';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container } from '../../styles/Layout.styles';
import CreateGame from './CreateGame';
import UpdateGame from './UpdateGame';

const Games: React.FC = () => {
  const [games, gamesLoading] = getGames();

  return (
    <Container>
      <Switch>
        <AnimatedRoute path="/games/new">
          <CreateGame />
        </AnimatedRoute>
        <AnimatedRoute path="/games/:id">
          <UpdateGame />
        </AnimatedRoute>
      </Switch>
      <PageHeader title="Games">
        <Button as={Link} to="/games/new">
          Create a new game
        </Button>
      </PageHeader>
      {gamesLoading && <Loading bg />}
      {games && <GameList {...{ games }} />}
    </Container>
  );
};

export default Games;
