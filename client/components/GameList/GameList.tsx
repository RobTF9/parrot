import React from 'react';
import { Link } from 'react-router-dom';
import { GAME_TYPE } from '../../utils/constants';
import { Grid } from '../../styles/Layout.styles';
import { GameWrapper } from './GameList.styles';

interface Props {
  games: {
    data: GameResource[];
  };
}

const GameList: React.FC<Props> = ({ games }) => {
  function createCopy(game: GameResource) {
    if (game.mode === GAME_TYPE.CONVERSATION) {
      return `${game.items.length} sentences`;
    }

    return `${game.items.length} questions`;
  }

  return (
    <Grid as="ul" columns="repeat(auto-fill, minmax(300px, 1fr))">
      {games.data.map((game) => (
        <GameWrapper key={game._id}>
          <p className="bold">{game.name}</p>
          <p className="capitalize border-b-s">
            {game.mode.toLowerCase()} – {createCopy(game)}
          </p>
          <Link to={`/play/${game._id}`}>Play game</Link>
          <Link to={`/games/${game._id}`}>Edit game</Link>
        </GameWrapper>
      ))}
    </Grid>
  );
};

export default GameList;
