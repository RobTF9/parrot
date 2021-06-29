import styled, { css } from 'styled-components';
import { Button, Tag } from '../../styles/Buttons.styles';
import { Pulse } from '../../styles/Animations.styles';

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  ${Tag} {
    position: relative;

    label {
      display: flex;
      line-height: 1.2;

      svg {
        margin-right: var(--smaller);
      }
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
`;

export const ItemTest = styled.div`
  display: flex;
  align-items: flex-end;

  label {
    flex-grow: 1;
    margin: 0;
  }

  button {
    flex-grow: 0;
    margin-bottom: var(--small);
    margin-left: var(--small);
    padding: var(--medium);

    svg {
      stroke: var(--core-white);
    }

    &:disabled {
      pointer-events: none;
      background-color: var(--error-light);

      svg {
        stroke: var(--error-dark);
      }
    }
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--small);

    label {
      grid-column: 1 / -1;

      input {
        margin-bottom: 0;
      }
    }

    button {
      margin: 0;
    }
  }
`;

export const SpeechTestButton = styled(Button)<{
  listening: boolean;
  correct: boolean;
}>`
  ${({ listening }) =>
    listening &&
    css`
      background-color: var(--core-light);
      box-shadow: 0 0 0 0 var(--core-light);
      transform: scale(1);
      animation: ${Pulse} 1.6s infinite;

      & > svg {
        stroke: var(--core-mid) !important;
      }

      &:hover,
      &:focus {
        background-color: var(--core-light);
      }
    `}

  ${({ correct }) =>
    correct &&
    css`
      background-color: var(--success-light);

      & > svg {
        stroke: var(--success-dark) !important;
      }

      &:hover,
      &:focus {
        background-color: var(--success-light);
      }
    `}
`;
