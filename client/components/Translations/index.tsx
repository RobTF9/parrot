import React from 'react';
import Button from '../Button';
import { TranslationsWrapper } from './Translations.styles';

interface Props {
  translations: TranslationResponse;
}

const Translations: React.FC<Props> = ({ translations }) => {
  return (
    <TranslationsWrapper>
      {[...new Set(translations)].map((t) => (
        <li key={t[0]}>
          <Button>{`${t[0]} - ${t[1]}`}</Button>
        </li>
      ))}
    </TranslationsWrapper>
  );
};

export default Translations;
