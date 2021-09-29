import styled from 'styled-components';

export const TranslationsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > li {
    margin-bottom: var(--small);
    display: flex;

    button {
      margin-left: var(--smaller);
    }
  }
`;
