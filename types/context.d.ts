export {};

declare global {
  interface IAuthContext {
    signIn: (details: Email & Password) => void;
    signUp: (details: Email & Password & Username) => void;
    resetPasswordEmail: (details: Email) => void;
    resetPassword: (details: Token & Password & Id) => void;
    signOut: () => void;
    authenticated?: boolean;
    authLoading: boolean;
    hideMessage: () => void;
  }

  interface IParrotContext {
    parrot?: ParrotSession;
    activateParrot: (l: string) => void;
    deactivateParrot: () => void;
  }

  interface IMessageContext {
    showMessage: (m: Message) => void;
    hideMessage: () => void;
  }
}
