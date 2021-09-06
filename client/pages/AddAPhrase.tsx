import React, { useState } from 'react';
import { useLexiconContext } from '../context/Lexicon';
import Loading from '../components/Loading';
import Parrot from '../components/Parrot';
import useTranslateService from '../hooks/useTranslateService';
import { Main, Top, Middle, Bottom } from '../styles/Layout.styles';
import Microphone from '../components/Microphone';
import Translations from '../components/Translations';
import Button from '../components/Button';
import PhraseForm from '../components/PhraseForm';
import { createItem } from '../data/itemResource';

const AddAPhrase: React.FC = () => {
  const { lexicon } = useLexiconContext();
  const [mutate, isLoading] = createItem();

  const [
    loadingTranslations,
    listening,
    translations,
    error,
  ] = useTranslateService(lexicon);

  const [phrase, setPhrase] = useState<ItemSubmission | undefined>(undefined);

  function conditionalRender(): JSX.Element {
    console.log(translations);
    if (phrase && lexicon && lexicon.language.name) {
      return (
        <PhraseForm
          {...{
            phrase,
            setPhrase,
            mutate,
            language: lexicon.language.name,
          }}
        />
      );
    }

    if (translations) {
      return <Translations {...{ translations, setPhrase }} />;
    }

    return <Microphone {...{ listening }} />;
  }

  return (
    <>
      {(loadingTranslations || isLoading) && <Loading />}
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
          {conditionalRender()}
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
