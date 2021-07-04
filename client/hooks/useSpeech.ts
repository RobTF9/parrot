import { useEffect, useState } from 'react';
import createSpeechServicesPonyfill from 'web-speech-cognitive-services';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useLexiconContext } from '../context/Lexicon';
import fuzzyMatchingThreshold from '../utils/fuzzyMatchThreshold';
import config from '../config';

interface UseSpeech {
  (lang: string, callback: (correct?: boolean) => void): {
    transcript: string;
    listening: boolean;
    canListen: boolean;
  };
}

const useSpeech: UseSpeech = (lang, callback) => {
  const [correct, setCorrect] = useState(false);
  const { lexicon } = useLexiconContext();
  const language = lexicon?.language.langCode;

  const canListen = !!SpeechRecognition.browserSupportsSpeechRecognition();

  const { listening, transcript } = useSpeechRecognition({
    commands: [
      {
        command: lang,
        callback: () => setCorrect(true),
        matchInterim: true,
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: fuzzyMatchingThreshold(lang),
      },
    ],
  });

  useEffect(() => {
    const loadPolyfill = async () => {
      const response = await fetch(config.speechEndpoint || '', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': config.speechToken || '',
        },
      });

      const authorizationToken = await response.text();

      const {
        SpeechRecognition: AzureSpeechRecognition,
      } = await createSpeechServicesPonyfill({
        credentials: { region: config.speechRegion, authorizationToken },
      });
      SpeechRecognition.applyPolyFill(AzureSpeechRecognition);
    };
    loadPolyfill();
  }, []);

  useEffect(() => {
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

export default useSpeech;
