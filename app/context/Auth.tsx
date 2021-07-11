import React, { createContext, useContext, useEffect, useState } from 'react';
import { get, post } from '../data/fetch';
import { useLexiconContext } from './Lexicon';
import { useMessageContext } from './Message';

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
  const { showMessage, hideMessage } = useMessageContext();
  const { activateLexicon, deactivateLexicon } = useLexiconContext();
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();

  const signIn = async (details: Email & Password) => {
    const response = await post<Email & Password, ServerReponse>(
      '/auth/signin',
      details
    );

    console.log(response);

    if (response.auth) setAuthenticated(response.auth);

    if (!response.auth && response.message) {
      setAuthenticated(response.auth);
      showMessage(response.message);
    }
  };

  const signUp = async (details: Email & Password & Username) => {
    const response = await post<Email & Password & Username, ServerReponse>(
      '/auth/signup',
      details
    );

    if (response.auth) setAuthenticated(response.auth);

    if (!response.auth && response.message) {
      setAuthenticated(response.auth);
      showMessage(response.message);
    }
  };

  const signOut = async () => {
    const response = await get<Promise<ServerReponse>>('/auth/signout');
    setAuthenticated(response.auth);
    deactivateLexicon();
  };

  const resetPasswordEmail = async (details: Email) => {
    const response = await post<Email, ServerReponse>('/auth/forgot', details);

    if (response.message) showMessage(response.message);
  };

  const resetPassword = async (details: Id & Token & Password) => {
    if (details.token === null || details._id === null) {
      showMessage({
        message: "Can't find correct parameters",
        type: 'error',
        visible: true,
      });
    }

    const response = await post<Id & Token & Password, ServerReponse>(
      '/auth/reset',
      details
    );

    if (response.message) showMessage(response.message);
  };

  const checkAuth = async () => {
    const response = await get<Promise<ServerReponse>>('/auth');
    setAuthenticated(response.auth);
    if (response.lexicon) activateLexicon(response.lexicon._id);
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
