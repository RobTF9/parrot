import { createGlobalStyle } from 'styled-components';

const Spacings = createGlobalStyle`
  :root {
    --smaller: 0.5rem;
    --small: 1rem;
    --medium: 2rem;
    --large: 4rem;
    --larger: 8rem;
  }


  .margin {
    &-t {
      margin-top: var(--medium);

      &-l {
        margin-top: var(--large);
      }

      &-xl {
        margin-top: var(--larger);
      }
    }

    &-b {
      margin-bottom: var(--medium);

      &-l {
        margin-bottom: var(--large);
      }

      &-xl {
      margin-bottom: var(--larger);
    }
    }
  }

`;

export default Spacings;
