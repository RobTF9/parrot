import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div<{ bg?: string; half?: boolean }>`
  margin: 0 auto;
  overflow: hidden;
  padding: 0 var(--medium);
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: var(--${({ bg }) => (!bg ? `core-lightest` : `${bg}`)});
  z-index: 1;

  ${({ half }) =>
    half &&
    css`
      background: linear-gradient(
        0deg,
        var(--core-lightest) 50%,
        var(--core-dark) 50%
      );
    `}
`;

export const Modal = styled(motion.div)`
  background-color: var(--core-white);
  box-shadow: var(--modal-shadow);
  border-radius: var(--medium);
  margin: 0 auto;
  max-width: 60rem;
  overflow: hidden;
  padding: var(--large);
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: var(--large) var(--medium);
  }
`;

export const Grid = styled.div<{
  columns?: string;
  breakpoints?: { width: string; columns: string }[];
}>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || '1fr'};
  gap: var(--medium);
  position: relative;
  align-items: start;
  position: relative;

  ${({ breakpoints }) =>
    breakpoints &&
    breakpoints.map(
      ({ width, columns }) => css`
        @media (max-width: ${width}) {
          grid-template-columns: ${columns};
        }
      `
    )}
`;

export const GridOverlap = styled(Grid)`
  margin-top: calc(var(--larger) * -1);
  z-index: 10;
`;

export const Flex = styled.div<{ justify?: string; noMargin?: boolean }>`
  ${({ justify, noMargin }) => css`
    display: flex;
    align-items: center;
    justify-content: ${justify || 'space-between'};
    margin-bottom: ${noMargin ? 0 : 'var(--large)'};
  `}
`;

export const Overlay = styled(motion.div)`
  background-color: var(--core-dark-50);
  min-height: 100vh;
  left: 0;
  position: fixed;
  padding: var(--large);
  overflow-y: scroll;
  top: 0;
  width: 100vw;
  z-index: 300;

  ${Modal} {
    padding-bottom: var(--large);
  }

  @media (max-width: 480px) {
    padding: var(--medium);
  }
`;

export const Card = styled.div`
  background-color: var(--core-white);
  box-shadow: var(--card-shadow);
  border-radius: var(--small);
  padding: var(--medium);
`;

export const Drawer = styled(Modal)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 60rem;
  overflow: scroll;
  border-radius: 0;

  @media (max-width: 700px) {
    max-width: 90%;
  }
`;

export const TouchableOpacity = styled.button`
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
`;
