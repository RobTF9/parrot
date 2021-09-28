import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const Rotation = keyframes`
	0% {
    transform: rotate(0deg);
	}

	100% {
    transform: rotate(360deg);
	}
`;

export const LoadingWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--core-light-50);
  display: flex;
  justify-content: center;
  align-items: center;

  &::after,
  &::before {
    content: '';
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: var(--larger);
    height: var(--larger);
    border: 0.6rem solid var(--core-white);
    border-radius: 50%;
    animation: ${Rotation} 2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--core-white) var(--core-white) transparent transparent;
  }

  &::before {
    animation-delay: -0.2s;
    border-color: transparent var(--core-white) transparent transparent;
  }
`;
