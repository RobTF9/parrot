import styled from 'styled-components';

export const TranslationsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > li {
    margin-bottom: var(--smaller);
  }
`;
