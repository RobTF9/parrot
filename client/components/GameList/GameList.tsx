import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../../styles/Layout.styles';
import { GameWrapper } from './GameList.styles';

interface Props {
  games: {
    data: GameResource[];
  };
}

const GameList: React.FC<Props> = ({ games }) => {
  return (
    <Grid as="ul" columns="repeat(auto-fill, minmax(300px, 1fr))">
      {games.data.map((game) => (
        <GameWrapper key={game._id}>
          <p className="bold">{game.name}</p>
          <p className="capitalize border-b-s">
            {game.mode.toLowerCase()} – {game.items.length} questions
          </p>
          <Link to={`/games/${game._id}`}>View game</Link>
        </GameWrapper>
      ))}
    </Grid>
  );
};

export default GameList;
