import styled from 'styled-components';

export const RadiosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--medium) 0;
  position: relative;
  align-items: flex-start;

  legend {
    margin-bottom: var(--small);
  }

  & > div {
    z-index: 100;
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: flex-end;

    & > p {
      position: absolute;
      top: var(--medium);
      background-color: var(--success-light);
      color: var(--success-dark);
      right: 0;
      width: 100%;
      opacity: 0;
      pointer-events: none;
      transform: translateY(var(--medium));
      transition: all 0.3s ease-in-out;
      z-index: 150;
    }

    svg {
      width: var(--medium);
      height: var(--medium);
      stroke: var(--success-dark);
      fill: var(--success-light);

      &:hover {
        & + p {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: var(--smaller);

    input {
      margin-right: var(--smaller);
    }

    &:focus-within {
      box-shadow: var(--focus-border);
      outline: none;
    }
  }
`;
