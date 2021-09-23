import React from 'react';
import GameList from '../components/GameList';
import Loading from '../components/Loading';
import { getAllGames } from '../data/gameResource';
import { Header, Main, StretchBlock } from '../styles/Layout.styles';

const Games: React.FC = () => {
  const [games, gamesLoading] = getAllGames();

  if (gamesLoading) return <Loading />;

  return (
    <Main>
      <Header>
        <h1 className="xlarge bold">Games</h1>
      </Header>
      {games && (
        <StretchBlock>
          <GameList {...{ games: [...games.data].reverse() }} />
        </StretchBlock>
      )}
    </Main>
  );
};

export default Games;
