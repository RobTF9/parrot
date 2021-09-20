const { exec } = require('child_process');

function postCollection(collection) {
  exec(
    `mongoimport --uri mongodb://localhost:27017/parrot-dev --file ${__dirname}/dump/${collection}.json --jsonArray --drop
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
postCollection('tags');
postCollection('phrase');
postCollection('game');
postCollection('results');
