import styled, { css } from 'styled-components';

export const InputWrapper = styled.label<{ active: boolean }>`
  position: relative;
  display: block;
  margin-bottom: 6rem;

  p.medium {
    color: var(--core-mid);
    transform: translateY(-10%) scale(1);
    transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    position: absolute;
    transform-origin: 0% 100%;
    top: 0;

    ${({ active }) =>
      active &&
      css`
        transform: translateY(-100%) scale(0.6);
      `}
  }

  input {
    border: none;
    border-bottom: 0.2rem solid var(--core-mid-20);
    font-weight: var(--font-medium);
    position: relative;

    &:focus {
      outline: none;
      border-bottom: 0.2rem solid var(--core-mid);

      & + p.medium {
        transform: translateY(-100%) scale(0.6);
      }
    }
  }
`;
