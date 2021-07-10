import { keyframes, Keyframes } from 'styled-components';

export const LanguagePulse = (l: string): Keyframes => keyframes`
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--${l}-bg-50);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 var(--medium) var(--${l}-bg-25);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--${l}-bg-25);
	}
`;
