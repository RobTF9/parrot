import styled from 'styled-components';

export const ListenerInner = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--core-mid);
  padding: var(--large) 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  h3,
  p {
    color: var(--core-white);
  }
`;
