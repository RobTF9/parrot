import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { post } from '../data/fetch';

interface UseTranslateService {
  (lexicon?: LexiconSession): [
    loadingTranslations: boolean,
    recievedPhrases: string[],
    translations?: TranslationResponse,
    error?: string
  ];
}

const useTranslateService: UseTranslateService = (lexicon) => {
  const {
    listening,
    transcript,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition();

  const [recievedPhrases, setRecievedPhrases] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [translations, setTranslations] = useState<TranslationResponse>();
  const [loadingTranslations, setLoadingTranslations] = useState<boolean>(
    false
  );

  // function to activate translation service
  const getTranslations = async () => {
    const response = await post<
      TranslationRequest,
      ServerReponse<TranslationResponse>
    >('/api/translate', recievedPhrases);

    if (response.data) {
      setTranslations(response.data);
      setLoadingTranslations(false);
    } else {
      setError('There was an error');
      setLoadingTranslations(false);
    }
  };

  // effect for performing actions based on state
  useEffect(() => {
    // if not listening and no transcript start listener
    if (!listening && !finalTranscript) {
      SpeechRecognition.startListening({
        language: lexicon?.language.langCode,
      });
    }

    // if listening and transcript finalized then stop
    if (listening && finalTranscript) {
      SpeechRecognition.stopListening();
    }

    // once listening stopped and final transcript recieve, translate
    if (!listening && finalTranscript) {
      setLoadingTranslations(true);
      getTranslations();
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

  // return as defined in interface function signature
  return [loadingTranslations, recievedPhrases, translations, error];
};

export default useTranslateService;
