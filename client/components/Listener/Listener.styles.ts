import styled, { css } from 'styled-components';

export const ListenerInner = styled.div<{ centered?: boolean }>`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--core-mid);
  padding: var(--large) 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ centered }) =>
    centered &&
    css`
      position: relative;
      bottom: auto;
      left: auto;
      justify-content: center;
      background-color: transparent;
    `}

  h3 {
    margin: var(--medium) 0;
  }

  h3,
  p {
    color: var(--core-white);
  }
`;
