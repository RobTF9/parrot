import { useEffect, useState } from 'react';
import createSpeechServicesPonyfill from 'web-speech-cognitive-services';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useLexiconContext } from '../context/Lexicon';
import fuzzyMatchingThreshold from '../utils/fuzzyMatchThreshold';

interface UseSpeech {
  (lang: string, callback: (correct?: boolean) => void): {
    transcript: string;
    listening: boolean;
    canListen: boolean;
  };
}

const useSpeech: UseSpeech = (lang, callback) => {
  const [loadingSpeechRecognition, setLoadingSpeechRecognition] = useState(
    true
  );
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
      const response = await fetch(
        'https://northeurope.api.cognitive.microsoft.com/sts/v1.0/issuetoken',
        {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': '178d4fdb59304fe891d0c9f4ccbbba74',
          },
        }
      );

      const authorizationToken = await response.text();

      const {
        SpeechRecognition: AzureSpeechRecognition,
      } = await createSpeechServicesPonyfill({
        credentials: { region: 'northeurope', authorizationToken },
      });

      SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
      setLoadingSpeechRecognition(false);
    };
    loadPolyfill();
  }, []);

  useEffect(() => {
    if (!loadingSpeechRecognition) {
      if (!listening && !correct) {
        SpeechRecognition.startListening({
          language,
          continuous: true,
        });
        if (transcript.trim() !== '') {
          callback(correct);
        }
      } else if (listening && correct) {
        callback(correct);
        SpeechRecognition.stopListening();
      }
    }
  }, [listening, correct, loadingSpeechRecognition]);

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
