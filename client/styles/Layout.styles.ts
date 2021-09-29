import styled, { css } from 'styled-components';

export const Main = styled.main`
  padding: var(--large);
  min-height: calc(100vh - 8.3rem); // subtract height of nav
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Grid {
  columns?: string;
  breakpoints?: { width: string; columns: string }[];
}

export const Header = styled.header<Grid>`
  padding-bottom: var(--medium);
  width: 100%;

  ${({ columns }) =>
    columns &&
    css`
      display: grid;
      grid-template-columns: ${columns};
      gap: var(--medium);
    `}

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

export const Block = styled.div<Grid>`
  position: relative;
  padding: var(--medium) 0;
  width: 100%;

  ${({ columns }) =>
    columns &&
    css`
      display: grid;
      grid-template-columns: ${columns};
      gap: var(--medium);
    `}

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

export const UpperBlock = styled(Block)`
  margin-bottom: auto;
`;

export const StretchBlock = styled(Block)`
  flex-grow: 1;
`;

export const LowerBlock = styled(Block)`
  margin-top: auto;
`;

export const Footer = styled.footer`
  padding-top: var(--large);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  & > * {
    margin-left: var(--large);
  }
`;
