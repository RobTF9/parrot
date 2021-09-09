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
  const [phrase, setPhrase] = useState<ItemSubmission | undefined>(undefined);
  const [parrotSpeaking, setParrotSpeaking] = useState<boolean>(false);

  const [
    loadingTranslations,
    listening,
    resetTranslations,
    translations,
    error,
  ] = useTranslateService(lexicon);

  const [mutate, isLoading] = createItem(undefined, (res) => {
    if (res.data) {
      setParrotSpeaking(true);
    }
  });

  const reset = () => {
    setPhrase(undefined);
    resetTranslations();
  };

  function conditionalRender() {
    if (phrase && lexicon && lexicon.language.name) {
      return (
        <>
          <Header>
            <Block columns="1fr 150px">
              <h1 className="bold xlarge margin-b">Save your phrase</h1>
              <Parrot
                {...{
                  language: lexicon?.language.name,
                  langCode: lexicon.language.langCode,
                  speaking: parrotSpeaking,
                  phrase: phrase.lang,
                  setSpeaking: setParrotSpeaking,
                }}
              />
            </Block>
          </Header>
          <StretchBlock>
            <PhraseForm
              {...{
                phrase,
                loading: isLoading,
                setPhrase,
                mutate,
                language: lexicon.language.name,
                reset,
              }}
            />
          </StretchBlock>
        </>
      );
    }

    if (translations) {
      return (
        <>
          <Header>
            <Block columns="1fr 150px">
              <div>
                <h1 className="bold xlarge margin-b">
                  Did you say any of these?
                </h1>
                <p>
                  If one of these is almost right, choose it and edit it on the
                  next page
                </p>
              </div>
              <Parrot {...{ language: lexicon?.language.name }} />
            </Block>
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
        <Footer>
          <Button action={() => setPhrase({ lang: '', pron: '', tran: '' })}>
            Enter manually
          </Button>
        </Footer>
      </>
    );
  }

  return (
    <>
      {loadingTranslations && <Loading />}
      {error && error}
      <Main>{conditionalRender()}</Main>
    </>
  );
};

export default AddAPhrase;
