import styled from 'styled-components';

export const TranscriptWrapper = styled.div`
  text-align: center;
  margin: var(--small) 0;
  height: var(--large);
  display: flex;
  align-items: center;

  ul {
    display: flex;
  }

  li {
    background-color: var(--core-lightest);
    width: var(--small);
    height: var(--small);
    border-radius: var(--small);
    margin-right: var(--small);
  }
`;
