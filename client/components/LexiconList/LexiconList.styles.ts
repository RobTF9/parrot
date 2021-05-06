import styled from 'styled-components';

export const ListWrapper = styled.ul`
  li {
    align-items: center;
    padding: var(--small);
    display: flex;

    & > div {
      display: flex;
    }
  }

  button {
    background: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--core-mid);
    margin-left: var(--medium);

    svg {
      margin-right: 0.2rem;
      stroke: var(--core-mid);
    }
  }

  .active {
    button:first-of-type {
      color: var(--success-dark);

      svg {
        stroke: var(--success-dark);
      }
    }
  }
`;
