import React from 'react';
import { useLexiconContext } from '../context/Lexicon';
import Loading from '../components/Loading';
import Parrot from '../components/Parrot';
import useTranslateService from '../hooks/useTranslateService';
import { Main, Top, Middle } from '../styles/Layout.styles';
import Microphone from '../components/Microphone';

const AddAPhrase: React.FC = () => {
  const { lexicon } = useLexiconContext();

  const [
    loadingTranslations,
    listening,
    translations,
    error,
  ] = useTranslateService(lexicon);

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
          {translations ? (
            [...new Set(translations)].map((t) => (
              <p key={t[0]}>
                {t[0]} - {t[1]}
              </p>
            ))
          ) : (
            <Microphone {...{ listening }} />
          )}
        </Middle>
      </Main>
    </>
  );
};

export default AddAPhrase;
