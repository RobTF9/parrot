import { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useLexiconContext } from '../../context/Lexicon';
import fuzzyMatchingThreshold from '../../utils/fuzzyMatchThreshold';

interface UseSpeechTest {
  (word: string): {
    transcript: string;
    startListening: () => void;
    correct: boolean;
    listening: boolean;
    canListen: boolean;
  };
}

const useSpeechTest: UseSpeechTest = (word) => {
  const [correct, setCorrect] = useState(false);
  const { lexicon } = useLexiconContext();
  const language = lexicon?.language.langCode;

  const canListen = !!SpeechRecognition.browserSupportsSpeechRecognition();

  const { listening, transcript } = useSpeechRecognition({
    commands: [
      {
        command: word,
        callback: () => setCorrect(true),
        matchInterim: true,
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: fuzzyMatchingThreshold(word),
      },
    ],
  });

  const startListening = () => {
    if (!listening) {
      setCorrect(false);
      SpeechRecognition.startListening({
        language,
      });
    }
  };

  return {
    transcript,
    startListening,
    correct,
    listening,
    canListen,
  };
};

export default useSpeechTest;
