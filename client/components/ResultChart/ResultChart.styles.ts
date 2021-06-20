import styled, { css } from 'styled-components';

export const ResultChartWrapper = styled.div`
  margin: var(--medium) 0 var(--large);

  ul li {
    display: flex;
    align-items: center;
    margin-bottom: var(--small);

    p {
      width: 10rem;
      margin-right: var(--medium);
    }
  }
`;

export const Plots = styled.ol<{ correct?: boolean }>`
  display: flex;

  li {
    width: var(--large);
    height: var(--large);
    border-radius: var(--large);
    background-color: var(--error-light);
    margin-right: var(--smaller);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      stroke: var(--error-dark);
    }

    ${({ correct }) =>
      correct &&
      css`
        &:last-of-type {
          background-color: var(--success-light);

          svg {
            stroke: var(--success-dark);
          }
        }
      `}
  }
`;
