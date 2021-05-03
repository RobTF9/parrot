import styled from 'styled-components';

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin: var(--medium) 0;
  position: relative;

  input {
    background-color: var(--grey);
    border: none;
    border-radius: var(--smaller);
    padding: var(--small);

    &:focus {
      box-shadow: var(--input--focus);
      outline: none;
    }
  }

  em {
    bottom: calc(var(--medium) * -1);
    color: var(--bengali-red);
    font-size: 1.2rem;
    position: absolute;
    right: 0;
  }
`;
