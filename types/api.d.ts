export {};

declare global {
  type ParrotSession = {
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
    parrot?: ParrotSession;
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
    phrase: number;
    games: number;
  }

  interface ParrotResource {
    _id: string;
    language: Language;
    goals: Goals;
    createdBy: { _id: string; username: string; email: string };
    sharedWith: { _id: string; username: string; email: string }[];
  }

  interface ParrotSubmission {
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
    parrot: string;
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

  interface ProgressPhrase extends PhraseResource {
    attempted: boolean;
    correct: boolean;
  }

  interface TagSubmission {
    tag: string;
    color: string;
  }

  interface TagResource {
    _id: string;
    parrot: string;
    createdBy: string;
    updatedBy: string;
    tag: string;
    color: string;
  }

  interface GameSubmission {
    phrases: PhraseResource[];
    results: Result[];
  }

  interface GameResource {
    _id: string;
    parrot: string;
    createdBy: string;
    updatedBy: string;
    updatedAt: string;
    createdAt: string;
    phrases: PhraseResource[];
    results: Result[];
  }

  interface Result {
    correct: string[];
    attempted: string[];
    createdAt: string;
    played: boolean;
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
