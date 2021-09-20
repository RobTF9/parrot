import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > ul {
    display: flex;
    width: 100%;
    padding: var(--medium) var(--large);

    & > li {
      margin-right: var(--medium);
    }

    & > li > .active {
      color: var(--core-dark);
      text-decoration: none;
    }
  }
`;
