import styled from 'styled-components';
import { Card } from '../../styles/Layout.styles';

export const SentenceWrapper = styled(Card)`
  text-decoration: none;
  transition: transform 0.2s ease-in-out;

  p {
    color: var(--core-dark);
  }

  p:last-of-type {
    color: var(--core-mid);
  }

  &:hover,
  &:focus {
    transform: scale(1.05);
  }
`;
