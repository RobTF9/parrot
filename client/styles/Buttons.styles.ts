import styled, { css } from 'styled-components';

export const Button = styled.button<{ danger?: boolean }>`
  background-color: var(--button-blue);
  border-radius: var(--smaller);
  box-shadow: var(--button-shadow);
  color: var(--white);
  cursor: pointer;
  overflow: auto;
  display: inline-block;
  line-height: 2.75rem;
  padding: var(--small) var(--large);
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover,
  &:active {
    box-shadow: var(--button-shadow--hover);
    color: var(--white);
  }

  &:focus {
    box-shadow: var(--button-shadow--focus);
    color: var(--white);
  }

  &[type='submit'] {
    margin-top: var(--medium);
  }

  ${({ danger }) =>
    danger &&
    css`
      background-color: var(--bengali-red);
    `}
`;

export const CheckboxButton = styled.label<{ selected?: boolean }>`
  align-items: center;
  border-radius: var(--smaller);
  box-shadow: var(--button-shadow);
  display: flex;
  margin: 0 var(--smaller) var(--smaller) 0;
  padding: var(--smaller) var(--small);
  position: relative;
  transition: box-shadow 0.3s ease;

  p {
    color: var(--white);
  }

  svg {
    stroke: var(--white);
    margin-right: var(--smaller);
  }

  input {
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &:hover,
  &:active,
  &:focus-within {
    box-shadow: var(--button-shadow--hover);
  }

  &:focus-within {
    &::after {
      border: 0.2rem solid var(--button-blue);
      border-radius: var(--smaller);
      content: '';
      display: block;
      position: absolute;
      top: -0.3rem;
      left: -0.3rem;
      width: calc(100% + 0.2rem);
      height: calc(100% + 0.2rem);
    }
  }

  ${({ selected }) =>
    selected
      ? css`
          background-color: var(--bengali-green);
        `
      : css`
          background-color: var(--button-blue);
        `}
`;

export const SecondaryButton = styled.button`
  background-color: var(--white);
  border: 0.1rem solid var(--button-blue);
  border-radius: var(--smaller);
  box-shadow: var(--button-shadow);
  color: var(--button-blue);
  cursor: pointer;
  padding: var(--small);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: var(--button-shadow--hover);
  }
`;
