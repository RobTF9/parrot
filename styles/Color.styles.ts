import { createGlobalStyle } from 'styled-components';

const Color = createGlobalStyle`
  :root {
    --core-dark: rgba(33, 40, 77, 1);
    --core-dark-10: rgba(33, 40, 77, 0.1);
    --core-dark-50: rgba(33, 40, 77, 0.5);
    --core-mid: rgba(95, 135, 240, 1);
    --core-mid-20: rgba(95, 135, 240, 0.2);
    --core-light: rgba(123, 208, 227, 1);
    --core-light-50: rgba(123, 208, 227, 0.5);
    --core-light-25: rgba(123, 208, 227, 0.25);
    --core-lightest: rgba(239, 252, 255, 1);
    --core-lightest-10: rgba(239, 252, 255, 0.1);
    --core-white: rgba(255, 255, 255, 1);

    --warning-light: rgba(255, 214, 113, 1);
    --warning-dark: rgba(79, 58, 5, 1);

    --error-light: rgba(255, 194, 194, 1);
    --error-dark: rgba(98, 11, 11, 1);

    --success-light: rgba(157, 251, 206, 1);
    --success-dark: rgba(12, 77, 45, 1);

    --parrot-black: #242424;
    --parrot-white: #F5F5F5;
    --parrot-perch: #CCB9A8;

    --bengali-bg: rgba(49, 121, 98, 1);
    --bengali-bg-50: rgba(49, 121, 98, 0.5);
    --bengali-bg-25: rgba(49, 121, 98, 0.2);
    --bengali-light: #E65358;
    --bengali-dark: #AD3E42;

    --hindi-bg: rgba(245, 172, 87, 1);
    --hindi-bg-50: rgba(245, 172, 87, 0.5);
    --hindi-bg-25: rgba(245, 172, 87, 0.25);
    --hindi-dark: rgba(255, 255, 255, 1);
    --hindi-light: rgba(66, 147, 42, 1);

    --korean-bg: rgba(194, 56, 68, 1);
    --korean-bg-50: rgba(194, 56, 68, 0.5);
    --korean-bg-25: rgba(194, 56, 68, 0.25);
    --korean-dark: rgba(255, 255, 255, 1);
    --korean-light: rgba(23, 71, 134, 1);

    --mandarin-bg: rgba(225, 72, 60, 1);
    --mandarin-bg-50: rgba(225, 72, 60, 0.5);
    --mandarin-bg-25: rgba(225, 72, 60, 0.25);
    --mandarin-light: rgba(255, 227, 82, 1);
    --mandarin-dark: rgba(255, 175, 82, 1);
  }
`;

export default Color;