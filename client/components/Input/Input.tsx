import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { InputWrapper } from './Input.styles';
import { Card } from '../../styles/Layout.styles';

interface Props {
  label: string;
  type?: string;
  name: string;
  error?: string;
  value: string;
  onChange: React.ChangeEventHandler;
  tip?: string;
}

const Input: React.FC<Props> = ({
  label,
  type = 'text',
  name,
  onChange,
  value,
  error,
  tip,
}) => {
  return (
    <InputWrapper aria-label={name} htmlFor={name}>
      <p>{label}</p>
      {tip && (
        <div>
          <FiHelpCircle />
          <Card as="p">{tip}</Card>
        </div>
      )}
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
