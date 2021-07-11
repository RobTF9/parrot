import React, { useState } from 'react';
import Input from '../client/components/Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Standard = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      {...{
        label: 'Label',
        name: 'Name',
        value,
        onChange: (e) => setValue(e.target.value),
      }}
    />
  );
};
