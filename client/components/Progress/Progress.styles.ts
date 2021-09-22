import styled from 'styled-components';

export const ProgressWrapper = styled.div`
  & > div {
    margin-bottom: var(--large);

    .error {
      color: var(--error);
      margin-top: var(--small);
    }

    & > button,
    & > a {
      margin-top: var(--small);
    }
  }
`;