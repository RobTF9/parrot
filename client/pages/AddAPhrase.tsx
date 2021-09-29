import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParrotContext } from '../context/Parrot';
import Loading from '../components/Loading';
import Parrot from '../components/Parrot';
import useTranslateService from '../hooks/useTranslateService';
import {
  Main,
  Header,
  Footer,
  StretchBlock,
  Block,
} from '../styles/Layout.styles';
import Microphone from '../components/Microphone';
import Translations from '../components/Translations';
import PhraseForm from '../components/PhraseForm';
import { createPhrase } from '../data/phraseResource';

const AddAPhrase: React.FC = () => {
  const { push } = useHistory();

  const { parrot } = useParrotContext();
  const [phrase, setPhrase] = useState<PhraseSubmission | undefined>(undefined);
  const [parrotSpeaking, setParrotSpeaking] = useState<boolean>(false);

  const [
    loadingTranslations,
    listening,
    resetTranslations,
    translations,
    error,
  ] = useTranslateService(parrot);

  const [mutate, isLoading] = createPhrase(undefined, (res) => {
    if (res.data) {
      setParrotSpeaking(true);
    }
  });

  const onSpeakingEnd = () => {
    setParrotSpeaking(false);
    setTimeout(() => push('/'), 1000);
  };

  const reset = () => {
    setPhrase(undefined);
    resetTranslations();
  };

  function conditionalRender() {
    if (phrase && parrot && parrot.language.name) {
      return (
        <>
          <Header>
            <Block columns="1fr 150px">
              <h1 className="bold xlarge margin-b">Save your phrase</h1>
              <Parrot
                {...{
                  language: parrot?.language.name,
                  langCode: parrot.language.langCode,
                  speaking: parrotSpeaking,
                  phrase: phrase.lang,
                  onSpeakingEnd,
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
                language: parrot.language.name,
                reset,
              }}
            />
          </StretchBlock>
        </>
      );
    }

    if (translations && parrot && parrot.language.langCode) {
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
              <Parrot {...{ language: parrot?.language.name }} />
            </Block>
          </Header>
          <StretchBlock>
            <Translations
              {...{
                translations,
                setPhrase,
                langCode: parrot.language.langCode,
              }}
            />
          </StretchBlock>
          <Footer>
            <button type="button" onClick={() => reset()}>
              Try again
            </button>
            <button
              type="button"
              onClick={() => setPhrase({ lang: '', pron: '', tran: '' })}
            >
              Enter manually
            </button>
          </Footer>
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
        <StretchBlock>
          <Parrot {...{ language: parrot?.language.name }} />
        </StretchBlock>
        <Block>
          <Microphone {...{ listening }} />
        </Block>
        <Footer>
          <button
            type="button"
            onClick={() => setPhrase({ lang: '', pron: '', tran: '' })}
          >
            Enter manually
          </button>
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
