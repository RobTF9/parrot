import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAuthContext, ISignIn, ISignUp } from './types.d';
import { get, post } from '../utils/fetch';

const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
});

export const useAuthContext = (): IAuthContext => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();

  const signIn = async (details: ISignIn) => {
    try {
      const response = await post<
        ISignIn,
        { auth?: boolean; message?: string }
      >('/auth/signin', details);
      setAuthenticated(response.auth);
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (
    details: ISignUp
  ): Promise<{ auth?: boolean; message?: string } | void> => {
    try {
      const response = await post<
        ISignUp,
        { auth?: boolean; message?: string }
      >('/auth/signup', details);
      setAuthenticated(response.auth);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      const response = await get<{ auth?: boolean; message?: string }>(
        '/auth/signout'
      );
      setAuthenticated(response.auth);
    } catch (error) {
      console.error(error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await get<{ auth?: boolean; message?: string }>('/auth');
      setAuthenticated(response.auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
