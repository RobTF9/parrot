import styled from 'styled-components';

export const GameListWrapper = styled.ul`
  ol {
    display: flex;
    margin: var(--medium) 0 var(--large);

    li {
      margin-right: var(--medium);
    }
  }

  .success {
    color: var(--success);
  }

  .error {
    color: var(--error);
  }
`;
