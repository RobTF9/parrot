import styled, { css } from 'styled-components';

export const MessageWrapper = styled.div<{ type: string }>`
  ${({ type }) => css`
    background: var(--${type}-light);
    border-radius: var(--smaller);
    padding: var(--large);
    margin-bottom: var(--large);

    p {
      color: var(--${type}-dark);
    }
  `}
`;
