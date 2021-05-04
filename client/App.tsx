import React from 'react';
import { AuthProvider } from './auth/context';
import Router from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
