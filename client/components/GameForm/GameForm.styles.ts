import { motion } from 'framer-motion';
import styled from 'styled-components';

export const DraggableItem = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  background-color: var(--core-dark-10);
  padding: var(--small);
  margin-bottom: var(--small);
  border-radius: var(--smaller);
  align-items: center;

  * {
    line-height: 1;
  }

  p {
    align-self: left;
    margin: 0 auto 0 var(--small);
  }

  button:first-of-type {
    background-color: transparent;
    cursor: grab;

    svg {
      stroke: var(--core-mid);
    }
  }
`;
