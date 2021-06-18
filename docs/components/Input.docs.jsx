import React from 'react';
import Input from '../../client/components/Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export const InputWithError = () => (
  <Input {...{ label: 'Input', error: 'Example of an error' }} />
);
