import styled, { css } from 'styled-components';

export const Main = styled.main`
  padding: var(--large);
  min-height: 100vh;
  max-width: 50rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  margin-bottom: 6rem;
`;

export const Middle = styled.div<{
  columns?: string;
  flex?: {
    direction: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    justify:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
  };
  breakpoints?: { width: string; columns: string }[];
}>`
  position: relative;

  & > * {
    margin-bottom: 6;
  }

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: ${flex.direction};
      align-items: ${flex.align};
      justify-content: ${flex.justify};
    `}

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

export const Bottom = styled.footer`
  margin-top: 6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > * {
    margin-left: var(--large);
  }
`;
