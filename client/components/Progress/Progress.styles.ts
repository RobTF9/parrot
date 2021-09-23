import styled from 'styled-components';

export const ProgressWrapper = styled.div`
  & > div {
    margin-bottom: var(--large);

    .error {
      color: var(--error);
      margin-top: var(--small);
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
      margin-right: var(--small);
      margin-top: -0.1rem;
    }

    & > .bold {
      display: flex;
      align-items: center;
    }
  }
`;
