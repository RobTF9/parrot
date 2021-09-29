import React, { createRef } from 'react';
import { FiPlay } from 'react-icons/fi';
import Button from '../Button';
import { TranslationsWrapper } from './styles';

interface Props {
  translations: TranslationResponse;
  setPhrase: (phrase: PhraseSubmission) => void;
  langCode: string;
}

interface TranProps {
  setPhrase: (phrase: PhraseSubmission) => void;
  langCode: string;
  t: [string, string];
}

const Tran: React.FC<TranProps> = ({ setPhrase, langCode, t }) => {
  const audioEl = createRef<HTMLAudioElement>();

  const play = () => {
    if (audioEl.current) {
      audioEl.current.play();
    }
  };

  return (
    <li key={t[0]}>
      <audio
        ref={audioEl}
        src={`https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${t[1]}`}
      />
      <Button
        action={() => setPhrase({ pron: '', tran: t[0], lang: t[1] })}
      >{`${t[0]} - ${t[1]}`}</Button>
      <Button action={play}>
        <FiPlay />
      </Button>
    </li>
  );
};

const Translations: React.FC<Props> = ({
  translations,
  setPhrase,
  langCode,
}) => {
  return (
    <>
      <TranslationsWrapper>
        {[...new Set(translations)].map((t) => (
          <Tran key={t[1]} {...{ setPhrase, langCode, t }} />
        ))}
      </TranslationsWrapper>
    </>
  );
};

export default Translations;
