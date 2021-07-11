import styled from 'styled-components';

export const Main = styled.main`
  padding: var(--large);
  min-height: 100vh;
  max-width: 50rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  margin-bottom: 6rem;
`;

export const Middle = styled.div``;

export const Bottom = styled.footer`
  margin-top: 6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > * {
    margin-left: var(--large);
  }
`;
