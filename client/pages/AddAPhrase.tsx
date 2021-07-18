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
  const [loadingTranslations, setLoadingTranslations] = useState<boolean>(
    false
  );

  // stop and start speech
  useEffect(() => {
    if (!lexicon) return;
    if (!listening && !finalTranscript) {
      SpeechRecognition.startListening({
        language: lexicon.language.langCode,
      });
    }
    if (listening && finalTranscript) {
      SpeechRecognition.stopListening();
    }
    if (!listening && finalTranscript) {
      setLoadingTranslations(true);
      console.log(recievedPhrases);
    }
  }, [listening, finalTranscript]);

  // push interim and transcript into array
  useEffect(() => {
    if (transcript) {
      setRecievedPhrases([...recievedPhrases, transcript]);
    }
    if (interimTranscript) {
      setRecievedPhrases([...recievedPhrases, interimTranscript]);
    }
  }, [transcript, interimTranscript]);

  // stop listening on unmount
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
        {recievedPhrases.map((r) => (
          <p key={r}>{r}</p>
        ))}
      </Middle>
    </Main>
  );
};

export default AddAPhrase;
