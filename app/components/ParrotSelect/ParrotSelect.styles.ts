import styled from 'styled-components';

export const ParrotClickable = styled.button`
  background-color: transparent;

  p.medium {
    color: var(--core-mid);
    text-decoration: underline;
  }

  &:hover,
  &:focus {
    p.medium {
      color: var(--core-dark);
      text-decoration: underline;
    }
  }
`;
