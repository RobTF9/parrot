import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  background-color: var(--core-mid);
  color: var(--core-white);
  font-weight: var(--font-medium);
  padding: 1.2rem;
  border-radius: 0.6rem;
  line-height: 1;

  &:hover,
  &:focus {
    background-color: var(--core-dark);
  }
`;
