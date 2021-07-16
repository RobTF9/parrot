import React, { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Parrot from '../components/Parrot';
import { useLexiconContext } from '../context/Lexicon';
import { Main, Top, Middle } from '../styles/Layout.styles';

const AddAPhrase: React.FC = () => {
  const { lexicon } = useLexiconContext();
  const {
    listening,
    transcript,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition();
  const [recievedPhrases, setRecievedPhrases] = useState<string[]>([]);

  useEffect(() => {
    if (!lexicon) return;
    if (!listening && !finalTranscript) {
      SpeechRecognition.startListening({
        language: lexicon.language.langCode,
      });
    } else if (listening && finalTranscript) {
      SpeechRecognition.stopListening();
    }
  }, [listening, finalTranscript]);

  useEffect(() => {
    if (transcript) {
      setRecievedPhrases([...recievedPhrases, transcript]);
    }

    if (interimTranscript) {
      setRecievedPhrases([...recievedPhrases, interimTranscript]);
    }
  }, [transcript, interimTranscript]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <Main>
      <Top>
        <h1 className="bold xlarge">Say a phrase to teach it to you parrot</h1>
      </Top>
      <Middle>
        <Parrot {...{ language: lexicon?.language.name }} />
        <p>Transcript: {transcript}</p>
        <p>Interim: {interimTranscript}</p>
        <p>Final: {finalTranscript}</p>
      </Middle>
    </Main>
  );
};

export default AddAPhrase;
