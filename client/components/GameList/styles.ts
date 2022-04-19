import styled from 'styled-components';

export const GameListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: var(--medium);

  & > li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  ol {
    position: relative;
    margin: var(--medium) 0 var(--medium);
    transform: translateX(calc(var(--medium) * -1));
    width: calc(100% + (var(--medium) * 2));
    overflow-x: scroll;
    display: flex;
    padding-right: var(--medium);
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      display: block;
      position: relative;
      flex-shrink: 0;
      padding-left: var(--medium);
    }
  }

  .success {
    color: var(--success);
  }

  .error {
    color: var(--error);
  }
`;
