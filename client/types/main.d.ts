declare interface ServerReponse<D = void> {
  auth?: boolean;
  message?: {
    message: string;
    type: string;
    visible: boolean;
  };
  data?: D;
  lexicon?: string;
}

declare interface UserResource {
  _id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

declare interface UserSubmission {
  email?: string;
  password?: string;
  username?: string;
}

declare interface LexiconResource {
  _id: string;
  language: {
    name: string;
    htmlCode: string;
    langCode: string;
  };
  createdBy: string;
  sharedWith: string[];
}

declare interface LexiconSubmission {
  language: {
    name: string;
    htmlCode: string;
    langCode: string;
  };
}
