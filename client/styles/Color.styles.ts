import { createGlobalStyle } from 'styled-components';

const Color = createGlobalStyle`
  :root {
    --core-dark: rgba(33, 40, 77, 1);
    --core-dark-10: rgba(33, 40, 77, 0.1);
    --core-mid: rgba(63, 105, 212, 1);
    --core-light: rgba(123, 208, 227, 1);
    --core-lightest: rgba(239, 252, 255, 1);
    --core-lightest-10: rgba(239, 252, 255, 0.1);
    --core-white: rgba(255, 255, 255, 1);

    --warning-light: rgba(255, 214, 113, 1);
    --warning-dark: rgba(79, 58, 5, 1);

    --error-light: rgba(255, 194, 194, 1);
    --error-dark: rgba(98, 11, 11, 1);

    --success-light: rgba(157, 251, 206, 1);
    --success-dark: rgba(12, 77, 45, 1);
  }
`;

export default Color;
