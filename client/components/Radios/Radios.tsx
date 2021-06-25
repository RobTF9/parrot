import React from 'react';
import { RadiosWrapper } from './Radios.styles';

interface Props {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; copy: string; checked: boolean }[];
}

const Radios: React.FC<Props> = ({ label, name, onChange, options }) => {
  return (
    <RadiosWrapper>
      <legend>{label}</legend>
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
