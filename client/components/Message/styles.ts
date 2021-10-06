import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MessageWrapper = styled(motion.div)<{ type: string }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100vw;
  padding: var(--large);
  z-index: 100;

  & > div {
    max-width: 90rem;
    background-color: var(--${({ type }) => type});
    padding: var(--small);
    border-radius: var(--smaller);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    & > p.mid {
      color: var(--core-white);
      margin-right: var(--small);
    }

    button {
      background-color: transparent;
      line-height: 0;

      & > svg {
        stroke: var(--core-white);
      }
    }
  }
`;
