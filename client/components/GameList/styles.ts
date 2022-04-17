import styled from 'styled-components';

export const GameListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--medium);

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
