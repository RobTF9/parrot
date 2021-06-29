import styled, { css } from 'styled-components';
import { Button } from '../../styles/Buttons.styles';
import { Pulse } from '../../styles/Animations.styles';

export const ErrorMessage = styled.div`
  background-color: var(--error-light);
  padding: var(--medium);
  border-radius: var(--small);

  * {
    color: var(--error-dark);
  }
`;

export const ItemTestWrapper = styled.div`
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
