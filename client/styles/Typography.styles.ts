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
    font-weight: 200;
    font-size: 1.6rem;
    line-height: 1.4;
    color: var(--core-dark);
  }

  strong,
  .bold {
    font-weight: 800;
    font-size: inherit;
    color: inherit;
  }

  h1,
  .xxxlarge {
    font-size: 3.6rem;
  }

  h2,
  .xxlarge {
    font-size: 2.8rem;
  }

  h3,
  .xlarge {
    font-size: 2.4rem;
  }

  h4,
  .large {
    font-size: 1.8rem;
  }

  p,
  .medium {
    font-size: 1.6rem;
  }

  h5,
  .small {
    font-size: 1.2rem;
  }

  .center {
    text-align: center;
  }

  .lightest {
    color: var(--core-lightest);
  }

  .buffer {
    margin: var(--large) 0;
  }

  .border {
    &--top {
      padding-top: var(--large);
      border-top: 0.1rem solid var(--core-dark-10);
    }

    &--bottom {
      padding-bottom: var(--large);
      margin-bottom: var(--large);
      border-bottom: 0.1rem solid var(--core-dark-10);
    }
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
