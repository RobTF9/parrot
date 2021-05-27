import React from 'react';
import { createGame } from '../../api/resources/game';
import AnimatedModal from '../../components/AnimatedModal';
import { GAME_TYPE, GAME_ORDER } from '../../utils/constants';
import { Loading } from '../../styles/Animations.styles';
import { getItems } from '../../api/resources/items';
import GameForm from '../../components/GameForm';

const CreateGame: React.FC = () => {
  const [create, createGameLoading] = createGame();
  const [items, itemsLoading] = getItems();

  const initialGame = {
    name: '',
    mode: GAME_TYPE.GRID,
    order: GAME_ORDER.MANUAL,
    items: [],
  };

  return (
    <AnimatedModal back="/games">
      {(itemsLoading || createGameLoading) && <Loading bg />}
      <h3 className="bold border-b-s xlarge">Create a new game</h3>
      {items && (
        <GameForm {...{ initialGame, items: items.data, mutate: create }} />
      )}
    </AnimatedModal>
  );
};

export default CreateGame;
