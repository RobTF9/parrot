import { createGlobalStyle } from 'styled-components';

const Spacings = createGlobalStyle`
  :root {
    --smaller: 0.5rem;
    --small: 1rem;
    --medium: 2rem;
    --large: 4rem;
    --larger: 8rem;
  }
`;

export default Spacings;
