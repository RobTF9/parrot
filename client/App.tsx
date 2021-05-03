import React from 'react';
import Router from './pages';
import Reset from './styles/Reset.styles';

const App: React.FC = () => {
  return (
    <>
      <Reset />
      <Router />
    </>
  );
};

export default App;
