const fs = require('fs');

const now = new Date();
const date = now.toISOString();

const users = `[
  {
    "_id": {
      "$oid": "6016b9410266200015c5e7f9"
    },
    "username": "User",
    "email": "user@email.com",
    "password": "$2a$08$swkXPjd4Hb3z28oHTJSBR.O.Q2st79CQk2i9DOoyecx6htPWSufcm",
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "6016b9410266200015c5e7f6"
    },
    "username": "CypressMailtrapUser",
    "email": "user@h5wjvmse.mailosaur.net",
    "password": "$2a$08$swkXPjd4Hb3z28oHTJSBR.O.Q2st79CQk2i9DOoyecx6htPWSufcm",
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "__v": 0
  }
]`;

const phrase = `[
  {
    "_id": {
      "$oid": "60185d89a7fba10015c88c15"
    },
    "parrot": {
      "$oid": "6093e4e3103adf787edeb009"
    },
    "lang": "কালো",
    "pron": "Kalo",
    "tran": "Black",
    "createdBy": {
      "$oid": "6016b9410266200015c5e7f9"
    },
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "60185d89a7fba10015c88c16"
    },
    "parrot": {
      "$oid": "6093e4e3103adf787edeb009"
    },
    "lang": "হলুদ",
    "pron": "Holud",
    "tran": "Yellow",
    "createdBy": {
      "$oid": "6016b9410266200015c5e7f9"
    },
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "60185d89a7fba10015c88c17"
    },
    "parrot": {
      "$oid": "6093e4e3103adf787edeb009"
    },
    "lang": "লাল",
    "pron": "Laal",
    "tran": "Red",
    "createdBy": {
      "$oid": "6016b9410266200015c5e7f9"
    },
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "60185d89a7fba10015c88c18"
    },
    "parrot": {
      "$oid": "6093e4e3103adf787edeb010"
    },
    "lang": "Ciao",
    "pron": "cià·o",
    "tran": "Hello",
    "createdBy": {
      "$oid": "6016b9410266200015c5e7f9"
    },
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "__v": 0
  }
]`;

const parrots = `[
  {
    "_id": {
      "$oid": "6093e4e3103adf787edeb009"
    },
    "createdBy": {
      "$oid": "6016b9410266200015c5e7f9"
    },
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "language": {
      "name": "Bengali",
      "htmlCode": "bn",
      "langCode": "bn-BN"
    },
    "goals": {
      "phrase": 3,
      "games": 1
    }
  },
  {
    "_id": {
      "$oid": "6093e4e3103adf787edeb010"
    },
    "createdBy": {
      "$oid": "6016b9410266200015c5e7f9"
    },
    "createdAt": {
      "$date": "${date}"
    },
    "updatedAt": {
      "$date": "${date}"
    },
    "language": {
      "name": "Italian",
      "htmlCode": "it",
      "langCode": "it-IT"
    },
    "goals": {
      "phrase": 1,
      "games": 1
    }
  }
]`;

fs.writeFile(`./scripts/data/users.json`, users, (err) => {
  if (err) throw err;
});

fs.writeFile(`./scripts/data/phrase.json`, phrase, (err) => {
  if (err) throw err;
});

fs.writeFile(`./scripts/data/parrots.json`, parrots, (err) => {
  if (err) throw err;
});
