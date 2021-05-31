import React from 'react';
import { InputWrapper } from './Input.styles';

interface Props {
  label: string;
  type?: string;
  name: string;
  error?: string;
  value: string;
  onChange: React.ChangeEventHandler;
}

const Input: React.FC<Props> = ({
  label,
  type = 'text',
  name,
  onChange,
  value,
  error,
}) => {
  return (
    <InputWrapper aria-label={name} htmlFor={name}>
      <p>{label}</p>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <em>{error}</em>}
    </InputWrapper>
  );
};

export default Input;
