import { keyframes, Keyframes } from 'styled-components';

export const LanguagePulse = (l: string): Keyframes => keyframes`
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--${l}-bg-50), 0 0 0 0 var(--${l}-bg);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 var(--medium) var(--${l}-bg-25), 0 0 var(--larger) 0 var(--${l}-bg);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 var(--${l}-bg-25);
	}
`;
