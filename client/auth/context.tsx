import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAuthContext, ISignIn, ISignUp } from './types';
import { get, post } from '../utils/fetch';

const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  signIn: () => null,
});

export const useAuthContext = (): IAuthContext => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const signIn = async (details: ISignIn) => {
    try {
      const response = await post<
        ISignIn,
        { auth?: boolean; message?: string }
      >('/auth/signin', details, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.auth) {
        setAuthenticated(response.auth);
      }
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
      >('/auth/signup', details, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      return console.error(error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await get<{ auth?: boolean; message?: string }>('/auth');
      if (response.auth) {
        setAuthenticated(response.auth);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
