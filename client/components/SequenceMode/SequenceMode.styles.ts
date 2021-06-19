import styled from 'styled-components';

export const SequenceModeWrapper = styled.div`
  position: absolute;
  background-color: var(--core-mid);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    position: absolute;
    top: var(--medium);
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  * {
    color: var(--core-lightest);
  }
`;
