import React from 'react';
import Router from './pages';
import Color from './styles/Color.styles';
import Reset from './styles/Reset.styles';
import Spacings from './styles/Spacings.styles';
import Typography from './styles/Typography.styles';
import Shadows from './styles/Shadows.styles';

const App: React.FC = () => {
  return (
    <>
      <Reset />
      <Typography />
      <Color />
      <Shadows />
      <Spacings />
      <Router />
    </>
  );
};

export default App;
