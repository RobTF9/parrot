import styled, { css } from 'styled-components';

export const GameTrackWrapper = styled.ul`
  width: 100%;
  height: var(--large);
  display: flex;
  justify-content: space-between;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: var(--medium);
    height: 0.2rem;
    width: 100%;
    background-color: var(--core-mid-20);
  }
`;

interface MarkerProps {
  correct?: boolean;
  error?: boolean;
  current?: boolean;
}

export const Marker = styled.li<MarkerProps>`
  height: var(--large);
  width: var(--large);
  background-color: var(--core-white);
  position: relative;
  z-index: 2;

  svg {
    width: 100%;
    height: 100%;
    stroke: var(--core-mid-50);

    ${({ correct }) =>
      correct &&
      css`
        stroke: var(--success);
      `}

    ${({ error }) =>
      error &&
      css`
        stroke: var(--error);
      `}
  }
`;
