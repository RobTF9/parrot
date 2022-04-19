import styled from 'styled-components';
import { Card } from '../../styles/Layout.styles';

export const ProgressWrapper = styled.div`
  ${Card} {
    display: flex;
    flex-direction: column;

    a,
    .error {
      align-self: flex-end;
    }
  }

  .error {
    color: var(--error);
    margin-top: var(--small);
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
