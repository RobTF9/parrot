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

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    label {
      margin-bottom: var(--small);

      input {
        margin-bottom: 0;
      }
    }

    button {
      flex-grow: 1;
      margin-left: 0;
    }
  }
`;
