import styled from 'styled-components';

export const SelectWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin: var(--medium) 0;
  position: relative;

  svg {
    bottom: var(--medium);
    width: var(--large);
    height: var(--large);
    position: absolute;
    right: var(--small);
    stroke: var(--core-mid);
  }

  select {
    appearance: none;
    cursor: pointer;
    background-color: var(--core-dark-10);
    border: none;
    height: 6rem;
    border-radius: var(--smaller);
    padding: var(--medium) var(--small);
    margin: var(--smaller) 0 var(--small);

    &:focus {
      box-shadow: var(--focus-border);
      outline: none;
    }
  }
`;
