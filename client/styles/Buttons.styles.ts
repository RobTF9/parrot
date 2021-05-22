import styled, { css } from 'styled-components';

export const Button = styled.button<{ danger?: boolean; small?: boolean }>`
  background: var(--core-mid);
  border-radius: var(--smaller);
  color: var(--core-white);
  cursor: pointer;
  overflow: auto;
  display: inline-block;
  flex-grow: 0;
  font-weight: 600;
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

export const StrokeButton = styled(Button)`
  background-color: transparent;
  box-shadow: 0 0 0 0.1rem var(--core-mid);
  color: var(--core-mid);
  box-sizing: border-box;
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
  background-color: ${({ color = 'var(--core-mid)' }) => color};
  color: var(--core-white);
  border-radius: var(--smaller);
  padding: var(--smaller) var(--smaller) 0.2rem;
  display: inline;
  text-transform: capitalize;
  margin: 0 var(--smaller) var(--smaller) 0;

  * {
    color: var(--core-white);
  }

  &:focus-within {
    background-color: var(--core-dark);
    box-shadow: var(--focus-border);
  }
`;
