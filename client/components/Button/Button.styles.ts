import styled, { css, keyframes } from 'styled-components';

const Rotation = keyframes`
	0% {
    transform: rotate(0deg);
	}

	100% {
    transform: rotate(360deg);
	}
`;

export const ButtonWrapper = styled.button<{
  loading?: boolean;
  disabled?: boolean;
}>`
  background-color: var(--core-mid);
  color: var(--core-white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-medium);
  padding: 1.2rem;
  border-radius: 0.6rem;
  line-height: 1;
  position: relative;
  text-decoration: none;

  &:hover,
  &:focus {
    background-color: var(--core-dark);
    color: var(--core-white);
  }

  ${({ loading }) =>
    loading &&
    css`
      color: var(--core-mid);

      &::after,
      &::before {
        content: '';
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: var(--medium);
        height: var(--medium);
        border: 0.2rem solid var(--core-white);
        border-radius: 50%;
        animation: ${Rotation} 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: var(--core-white) var(--core-white) transparent
          transparent;
      }

      &::before {
        animation-delay: -0.2s;
        border-color: transparent var(--core-white) transparent transparent;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: var(--disabled-light);
      color: var(--disabled-dark);
      pointer-events: none;
      font-style: italic;
    `}
`;
