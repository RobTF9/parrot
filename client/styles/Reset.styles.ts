import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  button,
  button:active,
  button:focus {
    outline: none;
    border: none;
  }

  a,
  a:active,
  a:focus {
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  html {
    font-size: 10px;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export default Reset;
