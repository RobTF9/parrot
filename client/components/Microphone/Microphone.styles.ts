import styled, { css, keyframes } from 'styled-components';

const Pulse = keyframes`
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--core-light-50);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 var(--small) var(--core-light-0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--core-light-0);
	}
`;

export const MicrophoneWrapper = styled.div<{
  correct: boolean;
  incorrect: boolean;
  listening: boolean;
}>`
  width: var(--large);
  height: var(--large);
  border-radius: var(--large);
  background-color: var(--core-light);
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke: var(--core-mid);
  }

  ${({ correct, incorrect, listening }) =>
    correct
      ? css`
          background-color: var(--success-light);

          svg {
            stroke: var(--success-dark);
          }
        `
      : incorrect
      ? css`
          background-color: var(--error-light);

          svg {
            stroke: var(--error-dark);
          }
        `
      : listening &&
        css`
          box-shadow: 0 0 0 0 var(--core-light);
          transform: scale(1);
          animation: ${Pulse} 1.6s infinite;
        `}
`;
