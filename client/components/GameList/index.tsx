import React from 'react';
import { GameListWrapper } from './styles';
import formatDate from '../../utils/formatDate';
import Button from '../Button';
import PhraseList from '../PhraseList';

interface Props {
  games: GameResource[];
}

const GameList: React.FC<Props> = ({ games }) => {
  return (
    <GameListWrapper>
      {games.map((game) => (
        <li key={game._id} className="border-b">
          <h3 className="large bold">
            {game.phrases.length} phrase{game.phrases.length !== 1 ? 's' : ''}
          </h3>
          <PhraseList {...{ phrases: game.phrases, noLinks: true }} />
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
