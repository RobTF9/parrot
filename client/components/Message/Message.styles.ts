import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MessageWrapper = styled(motion.div)<{ type: string }>`
  position: fixed;
  bottom: var(--large);
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 50rem;
  background-color: var(--${({ type }) => type});
  padding: var(--small);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--smaller);
  z-index: 100;

  p.medium {
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
`;
