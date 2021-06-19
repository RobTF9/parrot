import styled from 'styled-components';

export const ProgressWrapper = styled.div<{ percentage: number }>`
  width: 100vw;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: var(--medium);
  justify-content: space-between;
  align-items: center;
  background-color: var(--core-white);
  box-shadow: var(--modal-shadow);

  p {
    flex-shrink: 0;
  }

  div {
    flex-grow: 1;
    width: 100%;
    height: var(--small);
    margin: 0 var(--small);
    border-radius: var(--small);
    background-color: var(--success-light);
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: ${({ percentage }) => percentage}%;
      background-color: var(--success-dark);
    }
  }
`;
