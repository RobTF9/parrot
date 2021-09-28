import styled from 'styled-components';

export const PhraseFormWrapper = styled.form`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Actions = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  & > * {
    margin-left: var(--medium);
  }
`;
