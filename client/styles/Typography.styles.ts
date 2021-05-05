import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`
  *,
  input,
  label,
  select,
  button,
  textarea,
  option {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.4;
    color: var(--core-dark);
  }

  h1,
  .xxxl {
    font-size: 3.6rem;
  }

  h2,
  .xxl {
    font-size: 2.8rem;
  }

  h3,
  .xl {
    font-size: 2.4rem;
  }

  h4,
  .l {
    font-size: 1.8rem;
  }

  p,
  .m {
    font-size: 1.6rem;
  }

  h5,
  .s {
    font-size: 1.2rem;
  }

  strong,
  .b {
    font-weight: 800;
  }

  a {
    font-weight: 600;
    color: var(--core-mid);

    &:hover {
      color: var(--core-light);
    }
  }
`;

export default Typography;
