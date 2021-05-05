import styled from 'styled-components';

export const Container = styled.div<{ bg?: string }>`
  margin: 0 auto;
  overflow: hidden;
  padding: var(--medium);
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--${({ bg }) => (!bg ? `core-lightest` : `${bg}`)});
`;

export const Card = styled.div`
  background-color: var(---core-white);
  box-shadow: var(--card-shadow);
  border-radius: var(--small);
  padding: var(--medium);
`;

export const Modal = styled.div`
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
