import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Styles from './styles';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <>
      <Styles />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <SplashPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
