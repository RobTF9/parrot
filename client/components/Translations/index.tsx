import React from 'react';
import Button from '../Button';
import { TranslationsWrapper } from './Translations.styles';

interface Props {
  translations: TranslationResponse;
  setPhrase: (phrase: PhraseSubmission) => void;
}

const Translations: React.FC<Props> = ({ translations, setPhrase }) => {
  return (
    <TranslationsWrapper>
      {[...new Set(translations)].map((t) => (
        <li key={t[0]}>
          <Button
            action={() => setPhrase({ pron: '', tran: t[0], lang: t[1] })}
          >{`${t[0]} - ${t[1]}`}</Button>
        </li>
      ))}
    </TranslationsWrapper>
  );
};

export default Translations;
