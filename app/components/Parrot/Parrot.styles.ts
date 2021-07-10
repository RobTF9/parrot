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
  lexicon?: LexiconSession;
}>`
  position: relative;
  width: 30rem;
  height: 30rem;
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

    ${({ lexicon, duration }) =>
      lexicon &&
      css`
        background-color: var(--${lexicon.language.name.toLowerCase()}-bg);
        animation: ${LanguagePulse(lexicon.language.name.toLowerCase())}
          ${duration * 2}s infinite;
      `}
  }

  & > svg {
    position: relative;
    width: 100%;
    height: 100%;
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

    ${({ lexicon }) =>
      lexicon &&
      css`
        .body {
          fill: var(--${lexicon.language.name.toLowerCase()}-light);
        }

        .outer {
          fill: var(--${lexicon.language.name.toLowerCase()}-dark);
        }
      `}
  }
`;
