import React, { useState } from 'react';
import { useLexiconContext } from '../context/Lexicon';
import Loading from '../components/Loading';
import Parrot from '../components/Parrot';
import useTranslateService from '../hooks/useTranslateService';
import {
  Main,
  Header,
  UpperBlock,
  Footer,
  StretchBlock,
  Block,
} from '../styles/Layout.styles';
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

  function conditionalRender() {
    if (phrase && lexicon && lexicon.language.name) {
      return (
        <UpperBlock>
          <PhraseForm
            {...{
              phrase,
              setPhrase,
              mutate,
              language: lexicon.language.name,
            }}
          />
        </UpperBlock>
      );
    }

    if (translations) {
      return (
        <>
          <Header>
            <h1 className="bold xlarge">Did you say any of these?</h1>
            <Parrot {...{ language: lexicon?.language.name }} />
          </Header>
          <StretchBlock>
            <Translations {...{ translations, setPhrase }} />
          </StretchBlock>
        </>
      );
    }

    return (
      <>
        <Header>
          <h1 className="bold xlarge center">
            Say a phrase to teach it to you parrot
          </h1>
        </Header>
        <UpperBlock>
          <Parrot {...{ language: lexicon?.language.name }} />
        </UpperBlock>
        <Block>
          <Microphone {...{ listening }} />
        </Block>
      </>
    );
  }

  return (
    <>
      {(loadingTranslations || isLoading) && <Loading />}
      {error && error}
      <Main>
        {conditionalRender()}
        <Footer>
          <Button action={() => setPhrase({ lang: '', pron: '', tran: '' })}>
            Enter manually
          </Button>
        </Footer>
      </Main>
    </>
  );
};

export default AddAPhrase;
