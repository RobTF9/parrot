export {};

/** Base mongoose resource, always contain timestamps and _id */
interface Resource {
  _id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

declare global {
  type Email = { email: string };
  type Password = { password: string };
  type Username = { username: string };
  type Token = { token: string };
  type Id = { _id: string };

  /** A message object sent from the server */
  type Message = {
    /** Error or success, used to determine color on front end */
    type: string;
    /** Boolean to check if message should show or not */
    visible: boolean;
    /** The message text content */
    message: string;
  };

  /** The object used for determining language settings, on Parrot resource and session */
  interface Language {
    name: string;
    htmlCode: string;
    langCode: string;
    isRomanLanguage?: boolean;
  }

  /** The active parrot session, used to set
   * speech recognition language and fetch
   * resources */
  type ParrotSession = {
    _id: string;
    language: Language;
  };

  /** The generic Server response
   * @D typically a resource, or array of resources, from the database
   */
  interface ServerReponse<D = void> {
    /** A boolean that determines if client is authorised */
    auth?: boolean;
    message?: Message;
    /** Data returned from the response */
    data?: D;
    parrot?: ParrotSession;
  }

  /** An array of strings to be translated */
  type TranslationRequest = string[];

  /** An array of string tuples from the translation service.
   * [0] - The word in the language (e.g. Bengali)
   * [1] - The translation (English)
   */
  type TranslationResponse = [string, string][];

  /** The response from the progress service */
  type ProgressResponse = {
    data: {
      /** Contains goal (the target number the user needs to add)
       * and added (the actual value they've added) */
      phrase: {
        goal: number;
        added: number;
      };
      /** Contains goal (the target number the user needs to play)
       * and finished (the actual number they've finished) */
      games: {
        goal: number;
        finished: number;
      };
      /** Streak is a caluculated in the progress service middleware,
       * it detects the number of days users have consecutively acheived their goals
       */
      streak: number;
    };
  };

  /** The User resource, server will never respond with the password */
  interface UserResource extends Resource {
    email: string;
    username: string;
  }

  /** Required to either update or create a new user resource */
  interface UserSubmission {
    email?: string;
    password?: string;
    username?: string;
  }

  /** The goal settings, on Parrot, for phrase and games */
  interface Goals {
    phrase: number;
    games: number;
  }

  /** The Parrot resource, for determining language and goal settings
   * also used for sending correct phrases and games */
  interface ParrotResource extends Resource {
    language: Language;
    goals: Goals;
  }

  /** Required for creating a new parrot */
  interface ParrotSubmission {
    language?: Language;
    goals: Goals;
  }

  /** The Phrase resource, for storing the phrase, translation and pronounciation */
  interface PhraseResource extends Resource {
    /** The reference to the parrot (language) this phrase is from */
    parrot: string;
    createdBy: string;
    updatedBy: {
      _id: string;
      username: string;
    };
    /** The phrase in the language being learnt (e.g. Bengali) */
    lang: string;
    /** How the phrase is pronounced */
    pron: string;
    /** The translation of the phrase into English */
    tran: string;
  }

  /** Required for creating or updating a new Phrase */
  interface PhraseSubmission {
    /** The phrase in the language being learnt (e.g. Bengali) */
    lang: string;
    /** How the phrase is pronounced */
    pron: string;
    /** The translation of the phrase into English */
    tran: string;
  }

  /** Used during a game to keep track of which phrases
   * have been attempted correctly or incorrectly */
  interface ProgressPhrase extends PhraseResource {
    attempted: boolean;
    correct: boolean;
  }

  /** Required for creation of new game,
   * or for adding new results upon finishing */
  interface GameSubmission {
    phrases: PhraseResource[];
    results: Result[];
  }

  /** The Game resource, an array of phrases and results */
  interface GameResource extends Resource {
    parrot: string;
    createdBy: string;
    updatedBy: string;
    phrases: PhraseResource[];
    results: Result[];
  }

  /** The result object from previous games played */
  interface Result {
    correct: string[];
    attempted: string[];
    createdAt: string;
    played: boolean;
  }
}
