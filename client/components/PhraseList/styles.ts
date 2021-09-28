import styled from 'styled-components';

export const PhraseListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--medium);
`;
