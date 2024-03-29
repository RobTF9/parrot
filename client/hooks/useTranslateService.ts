import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { post } from '../data/fetch';

interface UseTranslateService {
  (parrot?: ParrotSession): [
    loadingTranslations: boolean,
    listening: boolean,
    resetTranslations: () => void,
    translations?: TranslationResponse,
    error?: string
  ];
}

const useTranslateService: UseTranslateService = (parrot) => {
  const {
    listening,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition();

  //  phrases speech recognition has detected the user saying
  const [recievedPhrases, setRecievedPhrases] = useState<string[]>([]);

  // the translations of recieved phrases
  const [translations, setTranslations] = useState<
    TranslationResponse | undefined
  >();
  const resetTranslations = () => {
    setTranslations(undefined);
    setRecievedPhrases([]);
  };

  // TODO: use to display api error
  const [error, setError] = useState<string>();

  // translation service loading state
  const [loadingTranslations, setLoadingTranslations] = useState<boolean>(
    false
  );

  // function to call translation service
  const getTranslations = async () => {
    if (translations) return;
    const response = await post<
      TranslationRequest,
      ServerReponse<TranslationResponse>
    >('/api/translate', recievedPhrases);

    if (response.data) {
      setTranslations(response.data);
      setLoadingTranslations(false);
    } else {
      setError('There was an error with the translation service');
      setLoadingTranslations(false);
    }
  };

  // effect for performing actions based on state
  useEffect(() => {
    // if not listening and no transcript start listener
    if (!listening && !translations) {
      SpeechRecognition.startListening({
        language: parrot?.language.langCode,
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
  }, [listening, finalTranscript, translations]);

  // push interim transcript into array
  useEffect(() => {
    if (interimTranscript) {
      setRecievedPhrases([...recievedPhrases, interimTranscript]);
    }
  }, [interimTranscript]);

  // stop listening on unmount
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  // return as defined in interface function signature
  return [
    loadingTranslations,
    listening,
    resetTranslations,
    translations,
    error,
  ];
};

export default useTranslateService;
