import styled from 'styled-components';

export const TagCreatorWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  label {
    flex-grow: 1;
    margin-top: 0;
  }

  button {
    flex-grow: 0;
    margin-bottom: calc(var(--small) + var(--medium));
    margin-left: var(--small);
  }
`;
