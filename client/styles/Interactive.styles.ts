import styled from 'styled-components';

export const TouchableOpacity = styled.button`
  background-color: transparent;

  * {
    color: var(--core-mid);
    text-decoration: underline;
  }

  &:hover,
  &:focus {
    * {
      color: var(--core-dark);
      text-decoration: underline;
    }
  }
`;
