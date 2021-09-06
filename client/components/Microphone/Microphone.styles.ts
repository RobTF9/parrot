import styled, { css, keyframes } from 'styled-components';

const Pulse = keyframes`
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--core-mid-50), 0 0 0 0 var(--core-mid);
	}

	70% {
		transform: scale(1.1);
		box-shadow: 0 0 0 var(--small) var(--core-mid-20), 0 0 var(--medium) 0 var(--core-mid-50);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--core-mid-20), 0 0 0 0 var(--core-mid-20);
	}
`;

export const MicrophoneWrapper = styled.div<{
  listening: boolean;
}>`
  width: var(--larger);
  height: var(--larger);
  border-radius: var(--large);
  background-color: var(--core-mid);
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    stroke: var(--core-white);
    width: var(--large);
    height: 3rem;
  }

  ${({ listening }) =>
    listening &&
    css`
      box-shadow: 0 0 0 0 var(--core-light);
      transform: scale(1);
      animation: ${Pulse} 1.6s infinite;
    `}
`;
