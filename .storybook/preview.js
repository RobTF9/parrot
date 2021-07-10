import { addDecorator } from '@storybook/react';
import React from 'react';
import Reset from '../styles/Reset.styles';
import Color from '../styles/Color.styles';
import Shadows from '../styles/Shadows.styles';
import Spacings from '../styles/Spacings.styles';
import Typography from '../styles/Typography.styles';

function withGlobalStyles(storyFn) {
  return (
    <>
      <Reset />
      <Color />
      <Shadows />
      <Spacings />
      <Typography />
      {storyFn()}
    </>
  );
}

addDecorator(withGlobalStyles);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
