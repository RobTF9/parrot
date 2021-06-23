import React from 'react';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../api/resources/game';
import AnimatedModal from '../../components/AnimatedModal';
import { GAME_TYPE, GAME_ORDER } from '../../utils/constants';
import { Loading } from '../../styles/Animations.styles';
import { getItems } from '../../api/resources/items';
import GameForm from '../../components/GameForm';

const NoGames: React.FC = () => {
  const { push } = useHistory();
  const [create, createGameLoading] = createGame(undefined, (res) => {
    if (res.data) {
      setTimeout(() => {
        push(`/games/${res.data?._id}`);
      }, 3000);
    }
  });
  const [items, itemsLoading] = getItems();

  const initialGame = {
    name: '',
    mode: GAME_TYPE.GRID,
    order: GAME_ORDER.MANUAL,
    items: [],
  };

  return (
    <AnimatedModal>
      {(itemsLoading || createGameLoading) && <Loading bg />}
      <h3 className="bold xlarge">Create your first game</h3>
      <p className="border-b-s">
        Games are collections of words and sentences to help test your
        knowledge. You can view your previous result to track progress.
      </p>
      {items && (
        <GameForm {...{ initialGame, items: items.data, mutate: create }} />
      )}
    </AnimatedModal>
  );
};

export default NoGames;
