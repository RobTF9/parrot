import styled from 'styled-components';

export const NavWrapper = styled.nav`
  position: relative;
  background-color: var(--core-dark);
  width: 100vw;
  padding: var(--medium);
  display: flex;

  p {
    border-right: 0.1rem solid var(--core-lightest-10);
    padding-right: var(--medium);
    margin-right: var(--medium);
  }

  ul {
    display: flex;
  }

  li {
    margin-right: var(--small);
  }

  a {
    text-decoration: none;

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
`;
