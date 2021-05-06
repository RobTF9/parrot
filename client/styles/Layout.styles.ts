import styled, { css } from 'styled-components';

export const Container = styled.div<{ bg?: string; half?: boolean }>`
  margin: 0 auto;
  overflow: hidden;
  padding: 0 var(--medium);
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--${({ bg }) => (!bg ? `core-lightest` : `${bg}`)});
  z-index: 1;

  ${({ half }) =>
    half &&
    css`
      background: linear-gradient(
        0deg,
        var(--core-lightest) 50%,
        var(--core-dark) 50%
      );
    `}
`;

export const Modal = styled.div`
  background-color: var(--core-white);
  box-shadow: var(--modal-shadow);
  border-radius: var(--medium);
  margin: 0 auto;
  max-width: 60rem;
  overflow: hidden;
  padding: var(--large);
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: var(--large) var(--medium);
  }
`;

export const Grid = styled.div<{
  columns?: string;
  breakpoints?: { width: string; columns: string }[];
}>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || '1fr'};
  gap: var(--medium);
  position: relative;
  align-items: start;

  ${({ breakpoints }) =>
    breakpoints &&
    breakpoints.map(
      ({ width, columns }) => css`
        @media (max-width: ${width}) {
          grid-template-columns: ${columns};
        }
      `
    )}
`;

export const Card = styled.div`
  background-color: var(--core-white);
  box-shadow: var(--card-shadow);
  border-radius: var(--small);
  padding: var(--medium);
`;
