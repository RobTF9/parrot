import React, { createContext, useContext, useState } from 'react';
import { post } from '../utils/fetch';

interface IAuthContext {
  signIn: (details: ISignIn) => void;
  signOut: () => void;
  authenticated: boolean;
}

interface ISignIn {
  email: string;
  password: string;
}

const AuthContext = createContext<IAuthContext>({
  signIn: () => null,
  signOut: () => null,
  authenticated: false,
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
        setAuthenticated(true);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
