import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { LanguagePulse } from '../../styles/Animations.styles';

export const ParrotWrapper = styled(motion.div)<{
  duration: number;
  lexicon?: LexiconSession;
}>`
  position: relative;
  width: 30rem;
  height: 30rem;

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
