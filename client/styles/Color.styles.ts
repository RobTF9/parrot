import { createGlobalStyle } from 'styled-components';

const Color = createGlobalStyle`
  :root {
    --bengali-green: #006A4E;
    --bengali-red: #F42A41;

    /* Base */
    --grey: #f0f0f0;
    --white: #ffffff;
    --black: #222222;
    --white-0: rgba(255, 255, 255, 0);
    --white-02: rgba(255, 255, 255, 0.2);
    --white-05: rgba(255, 255, 255, 0.5);
    --black-0: rgba(0, 0, 0, 0);
    --black-005: rgba(0, 0, 0, 0.05);
    --black-025: rgba(0, 0, 0, 0.25);
    --black-04: rgba(0, 0, 0, 0.4);


    /* Actions */
    --button-blue: #2b78f6;
    --stroke-green: #CCE1DC;
  }

  body,
  html {
    background-color: var(--grey);
  }
`;

export default Color;
