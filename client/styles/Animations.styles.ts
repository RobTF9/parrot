import styled, { keyframes } from 'styled-components';

const LoadingBounce = keyframes`
  0%, 100% {
    transform: scale(0.0);

  } 50% {
    transform: scale(1.0);
  }
`;

export const Loading = styled.div<{ bg?: boolean }>`
  background-color: ${({ bg }) => (bg ? 'var(--core-white)' : 'transparent')};
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.8;
  top: 0;
  left: 0;
  z-index: 1000;

  &::before,
  &::after {
    border-radius: 50%;
    background-color: var(--core-mid);
    content: '';
    display: block;
    opacity: 0.6;
    position: absolute;
    left: calc(50% - 2rem);
    top: calc(50% - 2rem);
    width: 4rem;
    height: 4rem;
    transform-origin: 50% 50%;
    animation: ${LoadingBounce} 2s infinite ease-in-out;
  }

  &::after {
    animation-delay: -1s;
  }
`;
