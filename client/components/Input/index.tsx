import React from 'react';
import { InputWrapper } from './styles';

interface Props {
  label: string;
  type?: string;
  name: string;
  error?: string;
  value?: string | number;
  onChange: React.ChangeEventHandler;
}

const Input: React.FC<Props> = ({
  label,
  type = 'text',
  name,
  onChange,
  value = '',
  error,
}) => {
  const checkActive = (v?: string | number) => {
    if (typeof v === 'number' && !!v) {
      return true;
    }
    if (typeof v === 'string' && v.trim() !== '') {
      return true;
    }
    return false;
  };
  return (
    <InputWrapper active={checkActive(value)}>
      <input {...{ type, id: name, name, onChange, value }} />
      <p className="medium">{label}</p>
      {error && <em className="small">{error}</em>}
    </InputWrapper>
  );
};

export default Input;
