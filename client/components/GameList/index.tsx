import React from 'react';
import { GameListWrapper } from './GameList.styles';
import formatDate from '../../utils/formatDate';
import Button from '../Button';

interface Props {
  games: GameResource[];
}

const GameList: React.FC<Props> = ({ games }) => {
  return (
    <GameListWrapper>
      {games.map((game) => (
        <li key={game._id} className="border-t border-b">
          <h3 className="large bold">
            {game.phrases.length} phrase{game.phrases.length !== 1 ? 's' : ''}
          </h3>
          <ol>
            {game.phrases.map((phrase) => (
              <li key={phrase._id}>
                <p className="xxlarge mid">{phrase.lang}</p>
                <p className="small">
                  {phrase.pron}
                  <br />
                  {phrase.tran}
                </p>
              </li>
            ))}
          </ol>
          <h3 className="medium bold">
            Played {game.results.length} time
            {game.results.length !== 1 ? 's' : ''}
          </h3>
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
                <p className="bold">
                  {result.correct.length} / {result.attempted.length} correct
                </p>
                <p className="small">At {formatDate(result.createdAt)}</p>
              </li>
            ))}
          </ol>
          <Button to={`/replay/${game._id}`}>Replay game</Button>
        </li>
      ))}
    </GameListWrapper>
  );
};

export default GameList;
