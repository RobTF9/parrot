import styled from 'styled-components';

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin: var(--medium) 0;
  position: relative;

  input {
    background-color: var(--core-dark-10);
    border: none;
    border-radius: var(--smaller);
    padding: var(--medium) var(--small);
    margin: var(--smaller) 0 var(--small);

    &:focus {
      box-shadow: var(--focus-border);
      outline: none;
    }
  }

  em {
    bottom: calc(var(--medium) * -1);
    color: var(--error-dark);
    font-size: 1.2rem;
    position: absolute;
    right: 0;
  }
`;
