import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const MessageWrapper = styled(motion.div)<{
  type: string;
}>`
  ${({ type }) => css`
    position: fixed;
    bottom: 0;
    z-index: 500;
    width: 100vw;
    background: var(--${type}-light);
    padding: var(--medium);
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background: none;
      display: flex;
      align-items: center;
      position: absolute;
      right: var(--medium);
      top: var(--medium);
      height: var(--medium);
      color: var(--${type}-dark);

      svg {
        stroke: var(--${type}-dark);
        margin-left: var(--smaller);
      }
    }

    p {
      color: var(--${type}-dark);
    }

    @media (max-width: 600px) {
      flex-direction: column;

      button {
        margin-top: var(--small);
        position: relative;
        top: auto;
        right: auto;
      }
    }
  `}
`;
