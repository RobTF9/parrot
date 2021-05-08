export {};

declare global {
  interface IAuthContext {
    signIn: (details: Email & Password) => void;
    signUp: (details: Email & Password & Username) => void;
    resetPasswordEmail: (details: Email) => void;
    resetPassword: (details: Token & Password & Id) => void;
    signOut: () => void;
    authenticated?: boolean;
    hideMessage: () => void;
  }

  interface ILexiconContext {
    lexicon?: LexiconSession;
    activateLexicon: (l: string) => void;
    deactivateLexicon: () => void;
    yourLexicons?: { data: LexiconResource[] };
    sharedLexicons?: { data: LexiconResource[] };
    yoursLoading?: boolean;
    sharedLoading?: boolean;
    noLexicons?: boolean;
  }

  interface IMessageContext {
    updateMessage: (m: Message) => void;
    hideMessage: () => void;
  }
}
