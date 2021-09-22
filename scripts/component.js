const fs = require('fs');

const name = process.argv[2];

fs.mkdir(`./client/components/${name}`, { recursive: true }, (err) => {
  if (err) throw err;
});

const index = `import React from 'react';
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

const styles = `import styled from 'styled-components';

export const ${name}Wrapper = styled.div\`
\`;
`;

// index file
fs.writeFile(
  `./client/components/${process.argv[2]}/index.tsx`,
  index,
  (err) => {
    if (err) throw err;
  }
);

// style file
fs.writeFile(
  `./client/components/${process.argv[2]}/${process.argv[2]}.styles.ts`,
  styles,
  (err) => {
    if (err) throw err;
  }
);

console.log(`Component files created for ${name}`);
