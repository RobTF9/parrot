const fs = require('fs');

const name = process.argv[2];

fs.mkdir(`./src/components/${name}`, { recursive: true }, (err) => {
  if (err) throw err;
});

const jsx = `import React from 'react';
import { ${name}Wrapper } from './${name}.styles';
const ${name} = ({ value }) => {
  return (
    <${name}Wrapper>
      <p>{value}</p>
    </${name}Wrapper>
  );
};
export default ${name};
`;

const index = `import ${name} from './${name}';
export default ${name};
`;

const styles = `import styled from 'styled-components';
export const ${name}Wrapper = styled.div\`
\`;
`;

// main jsx file
fs.writeFile(
  `./src/components/${process.argv[2]}/${process.argv[2]}.jsx`,
  jsx,
  (err) => {
    if (err) throw err;
  }
);

// index file
fs.writeFile(`./src/components/${process.argv[2]}/index.js`, index, (err) => {
  if (err) throw err;
});

// style file
fs.writeFile(
  `./src/components/${process.argv[2]}/${process.argv[2]}.styles.js`,
  styles,
  (err) => {
    if (err) throw err;
  }
);

console.log(`Component files created for ${name}`);
