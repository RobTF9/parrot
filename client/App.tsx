import React from 'react';
import { AuthProvider } from './context/Auth';
import Router from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
