import styled from 'styled-components';

export const RadiosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--medium) 0;
  position: relative;
  align-items: flex-start;

  legend {
    margin-bottom: var(--small);
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: var(--smaller);

    input {
      margin-right: var(--smaller);
    }

    &:focus-within {
      box-shadow: var(--focus-border);
      outline: none;
    }
  }
`;
