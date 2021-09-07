import styled from 'styled-components';

export const Main = styled.main`
  padding: var(--large);
  min-height: 100vh;
  max-width: 50rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  padding-bottom: var(--large);
  width: 100%;
`;

export const Block = styled.div`
  position: relative;
  padding: var(--medium) 0;
  width: 100%;
`;

export const UpperBlock = styled(Block)`
  margin-bottom: auto;
`;

export const StretchBlock = styled(Block)`
  flex-grow: 1;
`;

export const LowerBlock = styled(Block)`
  margin-top: auto;
`;

export const Footer = styled.footer`
  padding-top: var(--large);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  & > * {
    margin-left: var(--large);
  }
`;
