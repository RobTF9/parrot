import React from 'react';
import Radios from '../../client/components/Radios';
import { GAME_ORDER } from '../../client/utils/constants';
import capitalize from '../../client/utils/capitalize';

export default {
  title: 'Client/Components/Radios',
  component: Radios,
};

export const RadiosStandard = () => (
  <Radios
    {...{
      name: 'order',
      label: 'How do you want to order this game?',
      defaultValue: GAME_ORDER.MANUAL,
      options: Object.values(GAME_ORDER).map((order) => ({
        value: order,
        copy: capitalize(order),
      })),
    }}
  />
);

export const RadiosWithTip = () => (
  <Radios
    {...{
      name: 'order',
      label: 'How do you want to order this game?',
      tip:
        'If you want your questions to be presented in a specific order then pick manual, you can then drag your words and sentences into the desired order. If you want to shuffle them every time you play the game then pick random.',
      defaultValue: GAME_ORDER.MANUAL,
      options: Object.values(GAME_ORDER).map((order) => ({
        value: order,
        copy: capitalize(order),
      })),
    }}
  />
);
