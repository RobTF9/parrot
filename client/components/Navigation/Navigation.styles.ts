import styled, { css } from 'styled-components';

export const NavWrapper = styled.nav`
  position: relative;
  background-color: var(--core-dark);
  width: 100vw;
  padding: var(--medium);
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;

    & > p {
      border-right: 0.1rem solid var(--core-lightest-10);
      padding-right: var(--medium);
      margin-right: var(--medium);

      @media (max-width: 850px) {
        display: none;
      }
    }
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

    @media (max-width: 660px) {
      span {
        display: none;
      }
    }

    svg {
      margin-right: var(--smaller);
      opacity: 0.5;
      margin-top: -0.2rem;

      @media (max-width: 660px) {
        margin-top: 0;
        opacity: 1;
      }
    }
  }
`;

export const BurgerButton = styled.button`
  background-color: transparent;
  display: none;
  height: 100%;

  @media (max-width: 460px) {
    display: flex;
    align-items: center;
  }
`;

export const LinksWrapper = styled.div`
  position: relative;
`;

export const MainLinks = styled.ul<{ mobileDropdown: boolean }>`
  @media (max-width: 460px) {
    flex-direction: column;
    position: absolute;
    z-index: 100;

    ${({ mobileDropdown }) => css`
      opacity: ${mobileDropdown ? 1 : 0};
    `}
  }
`;

export const LexiconSwitch = styled.div<{ show: boolean }>`
  border-right: 0.1rem solid var(--core-lightest-10);
  padding-right: var(--medium);
  margin-right: var(--medium);
  position: relative;
  z-index: 200;

  & > button {
    background: none;
    transition: color 0.3s ease;

    &:focus {
      box-shadow: var(--focus-border);
    }

    svg {
      margin-bottom: -0.3rem;
      transition: stroke 0.3s ease;

      ${({ show }) => show && `transform: rotate(180deg);`}
    }

    &:hover {
      color: var(--core-light);

      svg {
        stroke: var(--core-light);
      }
    }
  }

  & > ul {
    position: absolute;
    padding: var(--medium);
    background: var(--core-white);
    box-shadow: var(--card-shadow);
    border-radius: var(--small);
    display: flex;
    flex-direction: column;
    width: calc(100% + var(--medium));
    left: calc(var(--medium) * -1);
    top: calc(100% + var(--small));

    li,
    & > p {
      margin-bottom: var(--small);

      svg {
        margin-bottom: -0.25rem;
      }

      & > p {
        color: var(--success-dark);

        svg {
          stroke: var(--success-dark);
        }
      }
    }

    * {
      color: var(--core-dark);
    }

    button {
      background: none;
      color: var(--core-mid);
      transition: color 0.3s ease;

      svg {
        stroke: var(--core-mid);
        transition: stroke 0.3s ease;
      }

      &:hover {
        color: var(--core-dark);

        svg {
          stroke: var(--core-dark);
        }
      }

      &:focus {
        box-shadow: var(--focus-border);
      }
    }
  }
`;
