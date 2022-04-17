const { exec } = require('child_process');

const name = process.argv[2];

function postCollection(collection) {
  exec(
    `mongoimport --uri mongodb://localhost:27017/${name} --file ${__dirname}/data/${collection}.json --jsonArray --drop
    `,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}

postCollection('users');
postCollection('parrots');
postCollection('phrase');
postCollection('game');
