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
    <InputWrapper active={!!value && value.trim() !== ''}>
      <input {...{ type, id: name, name, onChange, value }} />
      <p className="medium">{label}</p>
      {error && <em className="small">{error}</em>}
    </InputWrapper>
  );
};

export default Input;
