import React from 'react';
import useGameSpeech from '../../hooks/useGameSpeech';
import Microphone from '../Microphone';
import { ListenerWrapper } from './styles';

interface ProgressPhrase extends PhraseResource {
  attempted: boolean;
  correct: boolean;
}

interface Props {
  parrot: ParrotSession;
  phrase: ProgressPhrase;
  phraseCorrect: (lang: string) => void;
  phraseIncorrect: (lang: string) => void;
}

const Listener: React.FC<Props> = ({
  parrot,
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
      <p className="xxlarge">
        {parrot.language.isRomanLanguage ? (
          <>
            Can you say <strong>{phrase.tran}</strong> in {parrot.language.name}
          </>
        ) : (
          <>
            Can you say <strong>{phrase.lang}</strong>
          </>
        )}
        <br />
        <span className="small">{phrase.tran}</span>
      </p>
      <Microphone {...{ listening }} />
    </ListenerWrapper>
  );
};

export default Listener;
