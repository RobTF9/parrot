import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get, post } from '../data/fetch';
import { useParrotContext } from './Parrot';
import { useMessageContext } from './Message';

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

const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  authLoading: false,
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  resetPasswordEmail: () => null,
  resetPassword: () => null,
  hideMessage: () => null,
});

export const useAuthContext = (): IAuthContext => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const { push } = useHistory();
  const [authLoading, setAuthLoading] = useState(false);
  const { showMessage, hideMessage } = useMessageContext();
  const { activateParrot, deactivateParrot } = useParrotContext();
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();

  const signIn = async (details: Email & Password) => {
    setAuthLoading(true);
    const response = await post<Email & Password, ServerReponse>(
      '/auth/signin',
      details
    );

    if (response.auth) setAuthenticated(response.auth);

    if (!response.auth && response.message) {
      setAuthenticated(response.auth);
      showMessage(response.message);
    }
    setAuthLoading(false);
  };

  const signUp = async (details: Email & Password & Username) => {
    setAuthLoading(true);
    const response = await post<Email & Password & Username, ServerReponse>(
      '/auth/signup',
      details
    );

    if (response.auth) setAuthenticated(response.auth);

    if (!response.auth && response.message) {
      setAuthenticated(response.auth);
      showMessage(response.message);
    }
    setAuthLoading(false);
  };

  const signOut = async () => {
    const response = await get<Promise<ServerReponse>>('/auth/signout');
    setAuthenticated(response.auth);
    deactivateParrot();
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

    if (response.data) {
      setTimeout(() => push('/'), 2000);
    }
  };

  const checkAuth = async () => {
    const response = await get<Promise<ServerReponse>>('/auth');
    setAuthenticated(response.auth);
    if (response.parrot) activateParrot(response.parrot._id);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        authLoading,
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
