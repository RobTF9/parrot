import styled, { css } from 'styled-components';

export const MessageWrapper = styled.div<{
  type: string;
  size?: string;
}>`
  ${({ type, size }) => css`
    background: var(--${type}-light);
    border-radius: var(--smaller);
    padding: var(--${size || 'large'});
    margin: var(--small) 0;

    p {
      color: var(--${type}-dark);
    }
  `}
`;
