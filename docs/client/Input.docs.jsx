import React from 'react';
import Input from '../../client/components/Input';

export default {
  title: 'Client/Components/Input',
  component: Input,
};

export const InputWithError = () => (
  <Input {...{ label: 'Label', error: 'Example of an error' }} />
);

export const InputStandard = () => <Input {...{ label: 'Label' }} />;

export const InputTip = () => (
  <Input
    {...{
      label: 'Label',
      tip:
        'If you want your questions to be presented in a specific order then pick manual, you can then drag your words and sentences into the desired order. If you want to shuffle them every time you play the game then pick random',
    }}
  />
);
