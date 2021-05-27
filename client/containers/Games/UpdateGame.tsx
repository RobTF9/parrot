import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getGame, updateGame } from '../../api/resources/game';
import AnimatedModal from '../../components/AnimatedModal';
import { Loading } from '../../styles/Animations.styles';
import { getItems } from '../../api/resources/items';
import GameForm from '../../components/GameForm';

const UpdateGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
  const [items, itemsLoading] = getItems();

  const [game, gameLoading] = getGame(id);
  const [update, updateLoading] = updateGame(id, (res) => {
    if (res.data) {
      setTimeout(() => {
        push('/games');
      }, 2000);
    }
  });

  return (
    <AnimatedModal back="/games">
      {(gameLoading || updateLoading || itemsLoading) && <Loading bg />}
      <h3 className="bold border-b-s xlarge">Update game</h3>
      {items && game && (
        <GameForm
          {...{ initialGame: game.data, items: items.data, mutate: update }}
        />
      )}
    </AnimatedModal>
  );
};

export default UpdateGame;
