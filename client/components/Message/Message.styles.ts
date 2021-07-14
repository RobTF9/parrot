import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MessageWrapper = styled(motion.div)<{ type: string }>`
  background-color: var(--${({ type }) => type});
  padding: var(--small);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--smaller);

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
