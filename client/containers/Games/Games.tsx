import React from 'react';
import { getGames } from '../../api/resources/game';
import GameList from '../../components/GameList';
import PageHeader from '../../components/PageHeader';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container } from '../../styles/Layout.styles';

const Games: React.FC = () => {
  const [games, gamesLoading] = getGames();

  return (
    <Container>
      {gamesLoading && <Loading bg />}
      <PageHeader title="Games">
        <Button>Create a new game</Button>
      </PageHeader>
      {games && <GameList {...{ games }} />}
    </Container>
  );
};

export default Games;
