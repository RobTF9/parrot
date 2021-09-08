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
          <Block columns="1fr 150px">
            <h1 className="bold xlarge margin-b">Save your phrase</h1>
            <Parrot {...{ language: lexicon?.language.name }} />
          </Block>
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
      {(loadingTranslations || isLoading) && <Loading />}
      {error && error}
      <Main>{conditionalRender()}</Main>
    </>
  );
};

export default AddAPhrase;
