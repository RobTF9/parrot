import { createGlobalStyle } from 'styled-components';

const Color = createGlobalStyle`
  :root {
    --core-dark: rgba(33, 40, 77, 1);
    --core-dark-10: rgba(33, 40, 77, 0.1);
    --core-mid: rgba(63, 105, 212, 1);
    --core-light: rgba(123, 208, 227, 1);
    --core-lightest: rgba(239, 252, 255, 1);
    --core-white: rgba(255, 255, 255, 1);
  }
`;

export default Color;
