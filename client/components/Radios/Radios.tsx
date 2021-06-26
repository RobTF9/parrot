import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { Card } from '../../styles/Layout.styles';
import { RadiosWrapper } from './Radios.styles';

interface Props {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; copy: string; checked: boolean }[];
  tip?: string;
}

const Radios: React.FC<Props> = ({ label, name, onChange, options, tip }) => {
  return (
    <RadiosWrapper>
      <legend>{label}</legend>
      {tip && (
        <div>
          <FiHelpCircle />
          <Card as="p">{tip}</Card>
        </div>
      )}
      {options.map(({ value, copy, checked }) => (
        <label htmlFor={value} key={value}>
          <input
            data-testid={`${name}-select-option`}
            value={value}
            type="radio"
            id={value}
            onChange={onChange}
            checked={checked}
            name={name}
          />
          <p>{copy}</p>
        </label>
      ))}
    </RadiosWrapper>
  );
};

export default Radios;
