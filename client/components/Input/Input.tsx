import React from 'react';
import { InputWrapper } from './Input.styles';

const Input: React.FunctionComponent<{
  label: string;
  type?: string;
  name: string;
  error?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type = 'text', name, onChange, value, error }) => {
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
