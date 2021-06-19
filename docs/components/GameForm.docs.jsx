import React from 'react';
import GameForm from '../../client/components/GameForm';

export default {
  title: 'Components/GameForm',
  component: GameForm,
};

export const Initial = () => <GameForm {...{ result: initialResult }} />;
