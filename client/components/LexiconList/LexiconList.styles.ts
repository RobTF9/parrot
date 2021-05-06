import styled from 'styled-components';

export const ListWrapper = styled.ul`
  li {
    align-items: center;
    padding: var(--small) 0;
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
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

export const Action = styled.button`
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
`;

export const ShareForm = styled.form`
  display: flex;
  align-items: flex-end;

  label {
    flex-grow: 1;
    margin-right: var(--medium);
  }

  button {
    height: 6.2rem;
    margin-bottom: calc(var(--medium) + var(--small));
  }
`;
