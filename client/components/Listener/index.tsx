import React from 'react';
import useGameSpeech from '../../hooks/useGameSpeech';
import Microphone from '../Microphone';
import { ListenerWrapper } from './Listener.styles';

interface ProgressPhrase extends PhraseResource {
  attempted: boolean;
  correct: boolean;
}

interface Props {
  phrase: ProgressPhrase;
  phraseCorrect: (lang: string) => void;
  phraseIncorrect: (lang: string) => void;
}

const Listener: React.FC<Props> = ({
  phrase,
  phraseCorrect,
  phraseIncorrect,
}) => {
  const { listening } = useGameSpeech(phrase.lang, (correct?: boolean) => {
    if (correct) {
      phraseCorrect(phrase.lang);
    } else {
      phraseIncorrect(phrase.lang);
    }
  });

  return (
    <ListenerWrapper>
      <p>Can you say {phrase.lang}</p>
      <button type="button" onClick={() => phraseCorrect(phrase.lang)}>
        Correct
      </button>
      <button type="button" onClick={() => phraseIncorrect(phrase.lang)}>
        Incorrect
      </button>
      <Microphone {...{ listening }} />
    </ListenerWrapper>
  );
};

export default Listener;
