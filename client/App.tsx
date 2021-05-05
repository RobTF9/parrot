import React from 'react';
import { AuthProvider } from './context/Auth';
import Router from './routes';
import Color from './styles/Color.styles';
import Reset from './styles/Reset.styles';
import Shadows from './styles/Shadows.styles';
import Spacings from './styles/Spacings.styles';
import Typography from './styles/Typography.styles';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Reset />
      <Color />
      <Spacings />
      <Typography />
      <Shadows />
      <Router />
    </AuthProvider>
  );
};

export default App;
