import 'regenerator-runtime/runtime';
import { ReactQueryDevtools } from 'react-query/devtools';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import { LexiconProvider } from './context/Lexicon';
import QueryContext from './context/Query';
import Router from './containers';
import { MessageProvider } from './context/Message';
import Styles from './styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MessageProvider>
        <QueryContext>
          <LexiconProvider>
            <AuthProvider>
              <ReactQueryDevtools />
              <Styles />
              <Router />
            </AuthProvider>
          </LexiconProvider>
        </QueryContext>
      </MessageProvider>
    </BrowserRouter>
  );
};

export default App;
