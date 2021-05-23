import styled from 'styled-components';

export const TabsWrapper = styled.ul`
  display: flex;
  margin: var(--large) 0;

  li {
    margin-right: var(--medium);
  }

  p {
    text-decoration: underline;
  }

  @media (max-width: 520px) {
    flex-direction: column;
    margin: 0 0 var(--medium);

    li {
      margin-right: 0;
      margin-bottom: var(--medium);
    }
  }
`;
