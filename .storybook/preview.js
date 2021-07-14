import { addDecorator } from '@storybook/react';
import React from 'react';
import Styles from '../client/styles';

function withGlobalStyles(storyFn) {
  return (
    <>
      <Styles />
      {storyFn()}
    </>
  );
}

addDecorator(withGlobalStyles);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
