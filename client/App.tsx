import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import { LexiconProvider } from './context/Lexicon';
import QueryContext from './context/Query';
import Router from './containers';
import Color from './styles/Color.styles';
import Reset from './styles/Reset.styles';
import Shadows from './styles/Shadows.styles';
import Spacings from './styles/Spacings.styles';
import Typography from './styles/Typography.styles';
import { MessageProvider } from './context/Message';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MessageProvider>
        <QueryContext>
          <AuthProvider>
            <LexiconProvider>
              <Reset />
              <Color />
              <Spacings />
              <Typography />
              <Shadows />
              <Router />
            </LexiconProvider>
          </AuthProvider>
        </QueryContext>
      </MessageProvider>
    </BrowserRouter>
  );
};

export default App;
