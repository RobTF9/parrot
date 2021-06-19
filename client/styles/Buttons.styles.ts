import styled, { css } from 'styled-components';

export const Button = styled.button<{
  danger?: boolean;
  positive?: boolean;
  small?: boolean;
}>`
  background: var(--core-mid);
  border-radius: var(--smaller);
  color: var(--core-white);
  cursor: pointer;
  display: inline-block;
  height: ${({ small }) => (small ? '' : '6rem')};
  flex-grow: 0;
  font-weight: 600;
  padding: ${({ small }) =>
    small ? `var(--smaller) var(--smaller)` : `var(--medium) var(--large)`};
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;

  svg {
    stroke: var(--core-white);
    transform: translateY(0.2rem);
  }

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
      background-color: var(--error-light);
      color: var(--error-dark);

      svg {
        stroke: var(--error-dark);
      }

      &:hover,
      &:active,
      &:focus {
        background: var(--error-dark);
        box-shadow: var(--focus-border);
        color: var(--error-light);

        svg {
          stroke: var(--error-light);
        }
      }

      &:disabled {
        background-color: var(--error-light);
        color: var(--error-dark);
        box-shadow: none;
        font-style: italic;
        cursor: not-allowed;

        svg {
          stroke: var(--error-dark);
        }
      }
    `}

  ${({ positive }) =>
    positive &&
    css`
      background-color: var(--success-light);
      color: var(--success-dark);

      svg {
        stroke: var(--success-dark);
      }

      &:hover,
      &:active,
      &:focus {
        background: var(--success-dark);
        box-shadow: var(--focus-border);
        color: var(--success-light);

        svg {
          stroke: var(--success-light);
        }
      }

      &:disabled {
        background-color: var(--success-light);
        color: var(--success-dark);
        box-shadow: none;
        font-style: italic;
        cursor: not-allowed;

        svg {
          stroke: var(--success-dark);
        }
      }
    `}
`;

export const StrokeButton = styled(Button)`
  background-color: var(--core-lightest);
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
  display: inline-flex;
  line-height: 1.2;
  text-transform: capitalize;
  margin: 0 var(--smaller) var(--smaller) 0;

  svg {
    margin-right: var(--smaller);
  }

  * {
    color: var(--core-white);
  }

  &:focus-within {
    background-color: var(--core-dark);
    box-shadow: var(--focus-border);
  }
`;
