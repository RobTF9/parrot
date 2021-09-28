import styled from 'styled-components';

export const ProgressWrapper = styled.div`
  & > div {
    margin-bottom: var(--large);
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .error {
      color: var(--error);
      margin-top: var(--small);
    }

    & > p {
      width: 100%;
    }

    & > button,
    & > a {
      margin-top: var(--small);
    }
  }

  .complete {
    color: var(--success);

    svg {
      stroke: var(--success);
      stroke-width: 0.3rem;
      margin-right: var(--smaller);
      margin-top: -0.2rem;
      width: 2.8rem;
      height: 2.8rem;
    }

    & > .bold {
      display: flex;
      align-items: center;
    }
  }
`;
