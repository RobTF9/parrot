import 'regenerator-runtime/runtime';
import React from 'react';
import SpeechRecognition from 'react-speech-recognition';
import { BrowserRouter } from 'react-router-dom';
import Styles from './styles';
import { AuthProvider } from './context/Auth';
import { ParrotProvider } from './context/Parrot';
import QueryContext from './context/Query';
import { MessageProvider } from './context/Message';
import Router from './router';
import NoSpeech from './components/NoSpeech';

const App: React.FC = () => {
  return (
    <>
      {!SpeechRecognition.browserSupportsSpeechRecognition() && <NoSpeech />}
      <Styles />
      <BrowserRouter>
        <MessageProvider>
          <QueryContext>
            <ParrotProvider>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </ParrotProvider>
          </QueryContext>
        </MessageProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
