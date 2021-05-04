import React, { createContext, useContext, useState } from 'react';

interface IAuthContext {
  signIn: () => void;
  signOut: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  signIn: () => null,
  signOut: () => null,
  authenticated: false,
});

export const useAuthContext = (): IAuthContext => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const signIn = () => {
    setAuthenticated(true);
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
