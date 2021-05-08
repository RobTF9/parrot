export {};

declare global {
  type LexiconSession = {
    _id: string;
    language: {
      name: string;
      htmlCode: string;
      langCode: string;
    };
  };
  interface ServerReponse<D = void> {
    auth?: boolean;
    message?: {
      message: string;
      type: string;
      visible: boolean;
    };
    data?: D;
    lexicon?: LexiconSession;
  }

  interface UserResource {
    _id: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  }

  interface UserSubmission {
    email?: string;
    password?: string;
    username?: string;
  }

  interface LexiconResource {
    _id: string;
    language: {
      name: string;
      htmlCode: string;
      langCode: string;
    };
    createdBy: string;
    sharedWith: string[];
  }

  interface LexiconSubmission {
    language: {
      name: string;
      htmlCode: string;
      langCode: string;
    };
  }
}
