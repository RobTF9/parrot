import styled from 'styled-components';

export const PageHeaderWrapper = styled.header`
  margin-bottom: var(--large);
  padding: var(--larger) 0 var(--larger);
  position: relative;
  z-index: 0;

  * {
    color: var(--white);
    max-width: 45rem;
  }

  h1 {
    color: var(--white);
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
    background-color: var(--bengali-green);
    height: calc(100% + var(--larger));
    left: calc(var(--medium) * -1);
    position: absolute;
    top: calc(var(--medium) * -1);
    width: calc(100% + var(--large));
    z-index: 0;
  }

  &::before {
    content: '';
    background-color: var(--bengali-red);
    border-radius: 30rem;
    height: 30rem;
    right: -10rem;
    position: absolute;
    top: -10rem;
    width: 30rem;
    z-index: 1;
  }
`;
