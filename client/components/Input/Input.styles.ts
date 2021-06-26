import styled from 'styled-components';

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin: var(--medium) 0;
  position: relative;

  & > div {
    z-index: 100;
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: flex-end;

    & > p {
      position: absolute;
      top: var(--medium);
      right: 0;
      width: 100%;
      opacity: 0;
      pointer-events: none;
    }

    svg {
      width: var(--medium);
      height: var(--medium);
      stroke: var(--success-dark);
      fill: var(--success-light);

      &:hover {
        & + p {
          opacity: 1;
        }
      }
    }
  }

  input {
    background-color: var(--core-dark-10);
    border: none;
    border-radius: var(--smaller);
    height: 6rem;
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
