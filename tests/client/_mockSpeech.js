import SpeechRecognition from 'react-speech-recognition';
import { CortiSpeechRecognition } from './_corti';

export default (poly = CortiSpeechRecognition) =>
  SpeechRecognition.applyPolyfill(poly);
