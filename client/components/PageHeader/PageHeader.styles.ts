import styled from 'styled-components';

export const PageHeaderWrapper = styled.header`
  margin-bottom: var(--large);
  padding: var(--large) 0 var(--larger);
  position: relative;
  z-index: 0;

  * {
    max-width: 45rem;
  }

  p {
    color: var(--core-white);
    margin-bottom: var(--medium);
  }

  h1 {
    color: var(--core-lightest);
    position: relative;
    z-index: 1;
  }

  div {
    position: relative;
    z-index: 1;

    & > button,
    & > a {
      margin-top: var(--medium);
    }
  }

  &::after {
    content: '';
    background-color: var(--core-dark);
    height: 100%;
    left: calc(var(--medium) * -1);
    top: 0;
    position: absolute;
    width: calc(100% + var(--large));
    z-index: 0;
  }
`;
