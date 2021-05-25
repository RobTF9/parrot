import React from 'react';
import { GAME_TYPE } from '../../utils/constants';
import { Grid, Card } from '../../styles/Layout.styles';

interface Props {
  games: {
    data: GameResource[];
  };
}

const GameList: React.FC<Props> = ({ games }) => {
  function createCopy(game: GameResource) {
    if (game.mode === GAME_TYPE.CONVERSATION) {
      return `${game.sentences.length} sentences`;
    }

    if (game.words) {
      return `${game.sentences.length + game.words.length} questions`;
    }

    return `${game.sentences.length} words`;
  }

  return (
    <Grid as="ul" columns="repeat(auto-fill, minmax(300px, 1fr))">
      {games.data.map((game) => (
        <Card as="li" key={game._id}>
          <p className="bold border-b-s">{game.name}</p>
          <p className="capitalize">
            {game.mode.toLowerCase()} – {createCopy(game)}
          </p>
        </Card>
      ))}
    </Grid>
  );
};

export default GameList;
