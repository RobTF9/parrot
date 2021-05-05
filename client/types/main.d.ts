declare interface ServerReponse<D = void> {
  auth: boolean;
  message?: string;
  data?: D;
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
