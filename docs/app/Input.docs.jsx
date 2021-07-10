import React, { useState } from 'react';
import Input from '../../app/components/Input';

export default {
  title: 'App/Components/Input',
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
