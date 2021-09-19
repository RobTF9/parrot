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

  type TranslationRequest = string[];
  type TranslationResponse = [string, string][];

  type ProgressResponse = {
    data: {
      phrases: {
        goal: number;
        added: number;
      };
      games: {
        goal: number;
        finished: number;
      };
    };
  };

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

  interface Language {
    name: string;
    htmlCode: string;
    langCode: string;
  }

  interface Goals {
    words: number;
    games: number;
  }

  interface LexiconResource {
    _id: string;
    language: Language;
    goals: Goals;
    createdBy: { _id: string; username: string; email: string };
    sharedWith: { _id: string; username: string; email: string }[];
  }

  interface LexiconSubmission {
    language?: Language;
    goals: Goals;
  }

  interface ItemSubmission {
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
    type: string;
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
    order: string;
    items: ItemResource[];
  }

  interface GameResource {
    _id: string;
    name: string;
    mode: string;
    lexicon: string;
    createdBy: string;
    updatedBy: string;
    order: string;
    items: ItemResource[];
    results: ResultResource[];
  }

  interface ResultResource {
    _id: string;
    lexicon: string;
    createdBy: string;
    game: GameResource;
    updatedAt: string;
    score: {
      correct: string[];
      total: number;
    };
    finished: boolean;
    items: {
      attempts: number;
      correct: boolean;
      skipped: boolean;
      item: ItemResource;
    }[];
  }

  interface ResultSubmission {
    game: string;
    score: {
      correct: string[];
      total: number;
    };
    finished: boolean;
    items: Array<
      ItemResource | { attempts: number; correct: boolean; skipped: boolean }
    >;
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
