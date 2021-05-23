import styled from 'styled-components';
import { Card } from '../../styles/Layout.styles';
import { InputWrapper } from '../Input/Input.styles';
import { SelectWrapper } from '../Select/Select.styles';

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

export const Filter = styled(Card)`
  margin: calc(var(--larger) * -1) 0 var(--medium);
  z-index: 1;
  position: relative;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--medium);

  ${InputWrapper}, ${SelectWrapper} {
    margin: 0;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
