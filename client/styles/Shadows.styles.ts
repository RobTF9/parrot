import { createGlobalStyle } from 'styled-components';

const Shadows = createGlobalStyle`
  :root {
    --modal-shadow: 0 var(--smaller) var(--large) rgba(0, 0, 0, 0.25);
    --card-shadow: 0 var(--smaller) var(--medium) rgba(0, 0, 0, 0.1);
    --focus-border: 0 0 0 0.2rem var(--core-light);
  }
`;

export default Shadows;
