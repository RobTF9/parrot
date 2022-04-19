import React from 'react';
import { Link } from 'react-router-dom';
import { GameListWrapper } from './styles';
import formatDate from '../../utils/formatDate';
import { Card } from '../../styles/Layout.styles';

interface Props {
  games: GameResource[];
}

const GameList: React.FC<Props> = ({ games }) => {
  return (
    <GameListWrapper>
      {games.map((game) => (
        <Card key={game._id} as="li">
          <header>
            <h3 className="large bold">
              {game.phrases.length} phrase{game.phrases.length !== 1 ? 's' : ''}
            </h3>
            <p>
              Played {game.results.length} time
              {game.results.length !== 1 ? 's' : ''}
            </p>
          </header>
          <ol>
            {[...game.results].reverse().map((result) => (
              <li
                key={result.createdAt}
                className={
                  result.correct.length === result.attempted.length
                    ? 'success'
                    : 'error'
                }
              >
                <p className="bold small">
                  {result.correct.length} / {result.attempted.length} correct
                </p>
                <p className="small">on {formatDate(result.createdAt)}</p>
              </li>
            ))}
          </ol>
          <Link to={`/replay/${game._id}`}>Replay game</Link>
        </Card>
      ))}
    </GameListWrapper>
  );
};

export default GameList;
