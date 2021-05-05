import { createGlobalStyle } from 'styled-components';

const Shadows = createGlobalStyle`
  :root {
    --modal-shadow: 0 var(--smaller) var(--large) rgba(0, 0, 0, 0.25);
    --input-focus: 0 0 0 0.2rem var(--core-light);
  }
`;

export default Shadows;
