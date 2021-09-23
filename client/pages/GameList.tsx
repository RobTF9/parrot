import React from 'react';
import Loading from '../components/Loading';
import { getAllGames } from '../data/gameResource';
import { Header, Main, StretchBlock } from '../styles/Layout.styles';
import formatDate from '../utils/formatDate';

const GameList: React.FC = () => {
  const [games, gamesLoading] = getAllGames();

  if (gamesLoading) return <Loading />;

  return (
    <Main>
      <Header>
        <h1 className="xlarge bold">Game list</h1>
      </Header>
      {games && (
        <StretchBlock as="ul">
          {games.data.map((game) => (
            <li key={game._id}>
              <h2 className="medium">
                First played at{' '}
                <span className="bold">{formatDate(game.createdAt)}</span>
              </h2>
              <p>Includes {game.phrases.length} phrases</p>
              <div>
                {game.phrases.map((phrase) => (
                  <p key={phrase._id}>
                    {phrase.lang} / {phrase.tran}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </StretchBlock>
      )}
    </Main>
  );
};

export default GameList;
