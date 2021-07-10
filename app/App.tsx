import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Styles from './styles';
import SplashPage from './pages/SplashPage';

const App: React.FC = () => {
  return (
    <>
      <Styles />
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <SplashPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
