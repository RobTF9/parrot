import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Styles from './styles';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/Auth';
import { LexiconProvider } from './context/Lexicon';
import QueryContext from './context/Query';
import { MessageProvider } from './context/Message';

const App: React.FC = () => {
  return (
    <>
      <Styles />
      <BrowserRouter>
        <MessageProvider>
          <QueryContext>
            <LexiconProvider>
              <AuthProvider>
                <Switch>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/">
                    <SplashPage />
                  </Route>
                </Switch>
              </AuthProvider>
            </LexiconProvider>
          </QueryContext>
        </MessageProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
