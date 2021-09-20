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
      phrase: {
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
    phrases: number;
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

  interface PhraseSubmission {
    lang: string;
    pron: string;
    tran: string;
  }
  interface PhraseResource {
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
    phrases: PhraseResource[];
  }

  interface GameResource {
    _id: string;
    name: string;
    mode: string;
    lexicon: string;
    createdBy: string;
    updatedBy: string;
    order: string;
    phrases: PhraseResource[];
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
    phrases: {
      attempts: number;
      correct: boolean;
      skipped: boolean;
      phrase: PhraseResource;
    }[];
  }

  interface ResultSubmission {
    game: string;
    score: {
      correct: string[];
      total: number;
    };
    finished: boolean;
    phrases: Array<
      PhraseResource | { attempts: number; correct: boolean; skipped: boolean }
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
