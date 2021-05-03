import { createGlobalStyle } from 'styled-components';

const Shadows = createGlobalStyle`
  :root {
    --button-shadow:
      inset 0 -0.2rem var(--black-04),
      inset 0 0.2rem var(--white-02);
    --button-shadow--hover:
      inset 0 0.2rem var(--black-0),
      inset 0 -0.2rem var(--white-0);
    --button-shadow--focus:
      inset 0 0.2rem var(--black-0),
      inset 0 -0.2rem var(--white-0),
      0 0 0 0.2rem var(--white),
      0 0 0 0.4rem var(--button-blue);
    --card-shadow:
      0 0.2rem 0.8rem var(--black-005);
    --card-shadow--focus:
      0 0.2rem 0.8rem var(--black-005),
      0 0 0 0.2rem var(--button-blue);
    --input--focus:
      0 0 0 0.2rem var(--button-blue);
    --modal-shadow:
      0 0.2rem 1.6rem var(--black-025);
  }
`;

export default Shadows;
