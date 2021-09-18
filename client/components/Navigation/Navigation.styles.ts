import styled from 'styled-components';

export const NavigationWrapper = styled.nav`
  max-width: 50rem;
  margin: 0 auto;

  & > ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: var(--medium);

    & > li > .active {
      color: var(--core-dark);
      text-decoration: none;
    }
  }
`;
