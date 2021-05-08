import styled, { css } from 'styled-components';

export const Button = styled.button<{ danger?: boolean; small?: boolean }>`
  background: var(--core-mid);
  border-radius: var(--smaller);
  color: var(--core-white);
  cursor: pointer;
  overflow: auto;
  display: inline-block;
  font-weight: 400;
  padding: var(--medium) var(--large);
  text-align: center;
  transition: all 0.3s ease;

  &:hover,
  &:active {
    background: var(--core-dark);
    box-shadow: var(--focus-border);
    color: var(--core-white);
  }

  &:focus {
    background: var(--core-dark);
    box-shadow: var(--focus-border);
    color: var(--core-white);
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

export const TextButton = styled.button`
  font-weight: 600;
  color: var(--core-mid);
  transition: color 0.3s ease;
  background: none;

  &:hover {
    color: var(--core-dark);
  }

  &:focus {
    box-shadow: var(--focus-border);
  }
`;
