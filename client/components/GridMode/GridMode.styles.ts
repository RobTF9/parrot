import styled, { css } from 'styled-components';
import { Card, Grid } from '../../styles/Layout.styles';

export const GridModeGrid = styled(Grid)`
  margin-top: calc(var(--larger) * -1);
`;

export const GridCard = styled(Card)<{ correct: boolean; skipped: boolean }>`
  position: relative;
  text-align: left;
  text-decoration: none;

  div {
    position: absolute;
    top: var(--medium);
    right: var(--medium);
    width: var(--large);
    height: var(--large);
    border-radius: var(--large);
    background-color: var(--core-mid);
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      stroke: var(--core-white);
    }
  }

  ${({ correct }) =>
    correct &&
    css`
      div {
        background-color: var(--success-light);

        svg {
          stroke: var(--success-dark);
        }
      }
    `}

  ${({ skipped }) =>
    skipped &&
    css`
      div {
        background-color: var(--error-light);

        svg {
          stroke: var(--error-dark);
        }
      }
    `}
`;
