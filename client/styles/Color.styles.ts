import { createGlobalStyle } from 'styled-components';

const Color = createGlobalStyle`
  :root {
    --core-dark: rgba(33, 40, 77, 1);
    --core-dark-10: rgba(33, 40, 77, 0.1);
    --core-dark-50: rgba(33, 40, 77, 0.5);
    --core-mid: rgba(95, 135, 240, 1);
    --core-mid-50: rgba(95, 135, 240, 0.5);
    --core-mid-20: rgba(95, 135, 240, 0.2);
    --core-light: rgba(123, 208, 227, 1);
    --core-light-50: rgba(123, 208, 227, 0.5);
    --core-light-25: rgba(123, 208, 227, 0.25);
    --core-lightest: rgba(239, 252, 255, 1);
    --core-lightest-10: rgba(239, 252, 255, 0.1);
    --core-white: rgba(255, 255, 255, 1);

    --disabled-light: #D9D9D9;
    --disabled-dark: #848484;
    --error: #C00;
    --success: #080;

    --parrot-black: #242424;
    --parrot-white: #F5F5F5;
    --parrot-perch: #CCB9A8;
    --parrot-bg: #CAD9FF;
    --parrot-dark: #3F69D4;
    --parrot-light: #87A5F4;

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

    --italian-bg: rgba(0, 146, 70, 1);
    --italian-bg-50: rgba(0, 146, 70, 0.5);
    --italian-bg-25: rgba(0, 146, 70, 0.25);
    --italian-light: rgba(206, 43, 55, 1);
    --italian-dark: rgba(255, 255, 255, 1);

    --german-bg: rgba(255, 204, 0, 1);
    --german-bg-50: rgba(255, 204, 0, 0.5);
    --german-bg-25: rgba(255, 204, 0, 0.25);
    --german-light: rgba(206, 43, 55, 1);
    --german-dark: rgba(60, 60, 60, 1);

    --french-bg: rgba(0, 70, 146, 1);
    --french-bg-50: rgba(0, 70, 146, 0.5);
    --french-bg-25: rgba(0, 70, 146, 0.25);
    --french-light: rgba(206, 43, 55, 1);
    --french-dark: rgba(255, 255, 255, 1);

    --spanish-bg: rgba(170, 21, 27, 1);
    --spanish-bg-50: rgba(170, 21, 27, 0.5);
    --spanish-bg-25: rgba(170, 21, 27, 0.25);
    --spanish-light: rgba(241, 191, 0, 1);
    --spanish-dark: rgba(255, 220, 0, 1);

    --japanese-bg: rgba(188, 0, 45, 1);
    --japanese-bg-50: rgba(188, 0, 45, 0.5);
    --japanese-bg-25: rgba(188, 0, 45, 0.25);
    --japanese-light: rgba(235, 235, 235, 1);
    --japanese-dark: rgba(245, 245, 245, 1);

    --turkish-bg: rgba(200, 16, 46, 1);
    --turkish-bg-50: rgba(200, 16, 46, 0.5);
    --turkish-bg-25: rgba(200, 16, 46, 0.25);
    --turkish-light: rgba(160, 0, 26, 1);
    --turkish-dark: rgba(245, 245, 245, 1);
  }
`;

export default Color;
