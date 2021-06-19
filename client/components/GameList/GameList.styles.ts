import styled from 'styled-components';
import { Card } from '../../styles/Layout.styles';

export const GameWrapper = styled(Card)`
  position: relative;
  height: 100%;

  p {
    color: var(--core-dark);
  }

  .capitalize {
    color: var(--core-mid);
  }

  a {
    margin-right: var(--small);
  }
`;
