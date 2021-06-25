import React from 'react';
import Radios from '../../client/components/Radios';
import { GAME_ORDER } from '../../client/utils/constants';
import capitalize from '../../client/utils/capitalize';

export default {
  title: 'Components/Radios',
  component: Radios,
};

export const RadiosWithError = () => (
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
