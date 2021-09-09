import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PhraseForm from '../client/components/PhraseForm';

export default {
  title: 'Components/PhraseForm',
  component: PhraseForm,
};

export const Standard = () => {
  const [phrase, setPhrase] = useState({ lang: '', tran: '', pron: '' });
  const mutate = () => console.log(phrase);

  return (
    <BrowserRouter>
      <PhraseForm
        {...{
          phrase,
          setPhrase,
          mutate,
          language: 'Bengali',
        }}
      />
    </BrowserRouter>
  );
};
