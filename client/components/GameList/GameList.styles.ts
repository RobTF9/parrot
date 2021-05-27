import styled from 'styled-components';
import { Card } from '../../styles/Layout.styles';

export const GameWrapper = styled(Card)`
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  position: relative;
  height: 100%;

  p {
    color: var(--core-dark);
  }

  .capitalize {
    color: var(--core-mid);
  }

  &:hover,
  &:focus {
    transform: scale(1.05);
  }
`;
