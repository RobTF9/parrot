const fs = require('fs');

const name = process.argv[2];

fs.mkdir(`./app/components/${name}`, { recursive: true }, (err) => {
  if (err) throw err;
});

const jsx = `import React from 'react';
import { ${name}Wrapper } from './${name}.styles';

interface Props {
  value: string;
}

const ${name}: React.FC<Props> = ({ value }) => {
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
  `./app/components/${process.argv[2]}/${process.argv[2]}.tsx`,
  jsx,
  (err) => {
    if (err) throw err;
  }
);

// index file
fs.writeFile(`./app/components/${process.argv[2]}/index.ts`, index, (err) => {
  if (err) throw err;
});

// style file
fs.writeFile(
  `./app/components/${process.argv[2]}/${process.argv[2]}.styles.ts`,
  styles,
  (err) => {
    if (err) throw err;
  }
);

console.log(`Component files created for ${name}`);
