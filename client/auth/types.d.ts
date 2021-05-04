export interface IAuthContext {
  signIn: (details: ISignIn) => void;
  signUp: (details: ISignUp) => void;
  signOut: () => void;
  authenticated?: boolean;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  username: string;
}
