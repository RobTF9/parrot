import styled from 'styled-components';

export const NavWrapper = styled.nav`
  position: relative;
  background-color: var(--core-dark);
  width: 100vw;
  padding: var(--medium);
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
  }

  p {
    border-right: 0.1rem solid var(--core-lightest-10);
    padding-right: var(--medium);
    margin-right: var(--medium);
  }

  ul {
    display: flex;
  }

  a {
    text-decoration: none;
    margin-right: var(--small);

    &.active {
      color: var(--core-light);
      text-decoration: underline;
    }
  }

  a:hover {
    color: var(--core-light);
  }

  * {
    color: var(--core-white);
  }

  .toggle {
    display: flex;
    align-items: center;
    margin-left: var(--medium);
    margin-right: 0;

    svg {
      margin-right: var(--smaller);
      opacity: 0.5;
      margin-top: -0.2rem;
    }
  }
`;
