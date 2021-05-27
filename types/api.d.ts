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

  interface ItemSubmission {
    tags: string[];
    lang: string;
    pron: string;
    tran: string;
  }
  interface ItemResource {
    _id: string;
    lexicon: string;
    createdBy: string;
    updatedBy: {
      _id: string;
      username: string;
    };
    tags: string[];
    createdAt: string;
    updatedAt: string;
    lang: string;
    pron: string;
    tran: string;
  }
  interface TagSubmission {
    tag: string;
    color: string;
  }

  interface TagResource {
    _id: string;
    lexicon: string;
    createdBy: string;
    updatedBy: string;
    tag: string;
    color: string;
  }

  interface GameSubmission {
    name: string;
    mode: string;
    sentences: string[];
    words?: string[];
  }

  interface GameResource {
    _id: string;
    name: string;
    mode: string;
    lexicon: string;
    createdBy: string;
    updatedBy: string;
    sentences: string[];
    words?: string[];
  }

  interface NotificationResource {
    _id: string;
    sender: {
      _id: string;
      username: string;
    };
    recipient: {
      _id: string;
      username: string;
    };
    url: string;
    message: string;
    createdAt: string;
  }
}
