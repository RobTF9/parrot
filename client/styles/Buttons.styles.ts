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
  text-decoration: none;

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

export const Tag = styled.li<{ color?: string }>`
  background-color: var(--core-light);
  color: var(--core-dark);
  border-radius: 0.2rem;
  padding: var(--smaller) var(--smaller) 0.2rem;
  display: inline;
  text-transform: capitalize;
  margin: 0 var(--smaller) var(--smaller) 0;

  * {
    color: var(--core-dark);
  }
`;
