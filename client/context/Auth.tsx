import React, { createContext, useContext, useEffect, useState } from 'react';
import { get, post } from '../api/fetch';
import { useLexiconContext } from './Lexicon';
import { useMessageContext } from './Message';

type Email = { email: string };
type Password = { password: string };
type Username = { username: string };
type Token = { token: string };
type Id = { _id: string };

export interface IAuthContext {
  signIn: (details: Email & Password) => void;
  signUp: (details: Email & Password & Username) => void;
  resetPasswordEmail: (details: Email) => void;
  resetPassword: (details: Token & Password & Id) => void;
  signOut: () => void;
  authenticated?: boolean;
  hideMessage: () => void;
}

const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  resetPasswordEmail: () => null,
  resetPassword: () => null,
  hideMessage: () => null,
});

export const useAuthContext = (): IAuthContext => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const { updateMessage, hideMessage } = useMessageContext();
  const { activateLexicon, deactivateLexicon } = useLexiconContext();
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();

  const signIn = async (details: Email & Password) => {
    const response = await post<
      Email & Password,
      { auth?: boolean; message?: string }
    >('/auth/signin', details);

    if (response.auth) setAuthenticated(response.auth);

    if (!response.auth && response.message) {
      setAuthenticated(response.auth);
      updateMessage({
        message: response.message,
        type: 'error',
        visible: true,
      });
    }
  };

  const signUp = async (
    details: Email & Password & Username
  ): Promise<ServerReponse | void> => {
    const response = await post<
      Email & Password & Username,
      { auth?: boolean; message?: string }
    >('/auth/signup', details);

    if (response.auth) setAuthenticated(response.auth);

    if (!response.auth && response.message) {
      setAuthenticated(response.auth);
      updateMessage({
        message: response.message,
        type: 'error',
        visible: true,
      });
    }
  };

  const signOut = async () => {
    const response = await get<Promise<ServerReponse>>('/auth/signout');
    setAuthenticated(response.auth);
    deactivateLexicon();
  };

  const resetPasswordEmail = async (details: Email) => {
    const response = await post<Email, { message: string }>(
      '/auth/forgot',
      details
    );

    updateMessage({
      message: response.message,
      type: 'success',
      visible: true,
    });
  };

  const resetPassword = async (details: Id & Token & Password) => {
    if (details.token === null || details._id === null) {
      updateMessage({
        message: "Can't find correct parameters",
        type: 'error',
        visible: true,
      });
    }

    const response = await post<Id & Token & Password, { message: string }>(
      '/auth/reset',
      details
    );

    updateMessage({
      message: response.message,
      type: 'success',
      visible: true,
    });
  };

  const checkAuth = async () => {
    const response = await get<Promise<ServerReponse>>('/auth');
    setAuthenticated(response.auth);
    if (response.lexicon) activateLexicon(response.lexicon);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        signIn,
        signUp,
        signOut,
        hideMessage,
        resetPasswordEmail,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
