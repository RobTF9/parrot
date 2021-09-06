import React, { useState } from 'react';
import { useLexiconContext } from '../context/Lexicon';
import Loading from '../components/Loading';
import Parrot from '../components/Parrot';
import useTranslateService from '../hooks/useTranslateService';
import { Main, Top, Middle, Bottom } from '../styles/Layout.styles';
import Microphone from '../components/Microphone';
import Translations from '../components/Translations';
import Button from '../components/Button';

const AddAPhrase: React.FC = () => {
  const { lexicon } = useLexiconContext();

  const [
    loadingTranslations,
    listening,
    translations,
    error,
  ] = useTranslateService(lexicon);

  const [phrase, setPhrase] = useState<ItemSubmission | undefined>(undefined);

  return (
    <>
      {loadingTranslations && <Loading />}
      {error && error}
      <Main>
        <Top>
          <h1 className="bold xlarge center">
            Say a phrase to teach it to you parrot
          </h1>
        </Top>
        <Middle
          flex={{
            align: 'center',
            justify: 'space-between',
            direction: 'column',
          }}
        >
          <Parrot {...{ language: lexicon?.language.name }} />
          {phrase ? (
            <p>{phrase.lang}</p>
          ) : translations ? (
            <Translations {...{ translations, setPhrase }} />
          ) : (
            <Microphone {...{ listening }} />
          )}
        </Middle>
        <Bottom>
          <Button action={() => setPhrase({ lang: '', pron: '', tran: '' })}>
            Enter manually
          </Button>
        </Bottom>
      </Main>
    </>
  );
};

export default AddAPhrase;
