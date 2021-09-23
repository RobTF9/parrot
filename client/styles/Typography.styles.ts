import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`
  :root {
    --font-bold: 800;
    --font-medium: 600;
    --font-regular: 400;
  }

  *,
  input,
  label,
  select,
  button,
  textarea,
  option {
    font-family: 'Nunito', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-weight: var(--font-regular);
    font-size: 1.8rem;
    line-height: 1.4;
    color: var(--core-dark);
  }

  strong,
  .bold {
    font-weight: var(--font-bold);
    font-size: inherit;
    color: inherit;
  }

  .mid {
    font-weight: var(--font-medium);
  }

  h1,
  .xxxlarge {
    font-size: 3rem;
  }

  h2,
  .xxlarge {
    font-size: 2.7rem;
  }

  h3,
  .xlarge {
    font-size: 2.4rem;
  }

  h4,
  .large {
    font-size: 2.1rem;
  }

  p,
  .medium {
    font-size: 1.8rem;
  }

  h5,
  .small {
    font-size: 1.5rem;
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

  .capitalize {
    text-transform: capitalize;
  }



  .border {
    &-t {
      padding-top: var(--large);
      margin-top: var(--large);
      border-top: 0.1rem solid var(--core-dark-10);

      &-s {
        padding-top: var(--medium);
        margin-top: var(--medium);
        border-top: 0.1rem solid var(--core-dark-10);
      }
    }

    &-b {
      padding-bottom: var(--large);
      margin-bottom: var(--large);
      border-bottom: 0.1rem solid var(--core-dark-10);

      &-s {
        padding-bottom: var(--medium);
        margin-bottom: var(--medium);
        border-bottom: 0.1rem solid var(--core-dark-10);
      }
    }
  }

  a, button {
    background: none;
    font-weight: var(--font-medium);
    color: var(--core-mid);
    transition: color 0.3s ease;
    text-decoration: underline;

    &:hover {
      color: var(--core-dark);
    }

    &:focus {
      box-shadow: var(--focus-border);
    }

    &.light {
      color: var(--core-light);

      &:hover {
        color: var(--core-mid);
      }
    }
  }
`;

export default Typography;
