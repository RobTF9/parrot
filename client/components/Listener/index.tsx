import React from 'react';
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
  return (
    <ListenerWrapper>
      <p>Can you say {phrase.lang}</p>
      <button type="button" onClick={() => phraseCorrect(phrase.lang)}>
        Correct
      </button>
      <button type="button" onClick={() => phraseIncorrect(phrase.lang)}>
        Incorrect
      </button>
    </ListenerWrapper>
  );
};

export default Listener;
