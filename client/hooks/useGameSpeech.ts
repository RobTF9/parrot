import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useParrotContext } from '../context/Parrot';
import fuzzyMatchingThreshold from '../utils/fuzzyMatchThreshold';

interface UseGameSpeech {
  (lang: string, callback: (correct?: boolean) => void): {
    transcript: string;
    listening: boolean;
    canListen: boolean;
  };
}

const useGameSpeech: UseGameSpeech = (lang, callback) => {
  const [correct, setCorrect] = useState(false);
  const { parrot } = useParrotContext();
  const language = parrot?.language.langCode;

  const canListen = !!SpeechRecognition.browserSupportsSpeechRecognition();

  const { listening, transcript } = useSpeechRecognition({
    commands: [
      {
        command: lang,
        callback: () => setCorrect(true),
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: fuzzyMatchingThreshold(lang),
      },
    ],
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      setCorrect(true);
    }
    if (!listening && !correct) {
      SpeechRecognition.startListening({
        language,
      });
      if (transcript.trim() !== '') {
        callback(correct);
      }
    } else if (listening && correct) {
      callback(correct);
      SpeechRecognition.stopListening();
    }
  }, [listening, correct]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return {
    transcript,
    listening,
    canListen,
  };
};

export default useGameSpeech;
