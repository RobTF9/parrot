import styled, { css, keyframes, Keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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
		box-shadow: 0 0 0 0 var(--${l}-bg-25), 0 0 0 0 var(--${l}-bg);
	}
`;

export const ParrotWrapper = styled(motion.div)<{
  duration: number;
  language?: string;
}>`
  position: relative;
  width: 100%;
  padding-top: 100%;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: calc(100% - 20%);
    width: calc(100% - 20%);
    border-radius: 50%;
    background-color: var(--parrot-bg);

    ${({ language, duration }) =>
      language &&
      css`
        background-color: var(--${language.toLowerCase()}-bg);
        animation: ${LanguagePulse(language.toLowerCase())} ${duration * 2}s
          infinite;
      `}
  }

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform-origin: 50% 50% !important;
    z-index: 100;

    .body {
      fill: var(--parrot-light);
    }

    .outer {
      fill: var(--parrot-dark);
    }

    .shadow {
      fill: rgba(0, 0, 0, 0.1);
    }

    .perch {
      fill: var(--parrot-perch);
    }

    .beak,
    .pupil {
      fill: var(--parrot-black);
    }

    .eye {
      fill: var(--parrot-white);
    }

    ${({ language }) =>
      language &&
      css`
        .body {
          fill: var(--${language.toLowerCase()}-light);
        }

        .outer {
          fill: var(--${language.toLowerCase()}-dark);
        }
      `}
  }
`;
