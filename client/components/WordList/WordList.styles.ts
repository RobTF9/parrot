import styled from 'styled-components';
import { Card } from '../../styles/Layout.styles';

export const WordWrapper = styled(Card)`
  text-decoration: none;

  p:last-of-type {
    color: var(--core-mid);
  }
`;

export const Tag = styled.li<{ color?: string }>`
  background-color: ${({ color }) => color};
  color: var(--core-white);
  border-radius: 0.2rem;
  padding: var(--smaller) var(--smaller) 0.2rem;
  display: inline;
  text-transform: capitalize;
`;
