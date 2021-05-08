import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { SelectWrapper } from './Select.styles';

interface Props {
  label: string;
  name: string;
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; copy: string }[];
}

const Select: React.FC<Props> = ({
  label,
  name,
  defaultValue,
  onChange,
  options,
}) => {
  return (
    <SelectWrapper htmlFor={name}>
      <FiChevronDown />
      <p>{label}</p>
      {/* eslint-disable-next-line */}
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map(({ value, copy }) => (
          <option
            data-testid={`${name}-select-option`}
            key={value}
            value={value}
          >
            {copy}
          </option>
        ))}
      </select>
    </SelectWrapper>
  );
};

export default Select;
