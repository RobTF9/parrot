import React from 'react';
import Parrot from '../components/Parrot';
import { useLexiconContext } from '../context/Lexicon';
import { Main, Top, Middle } from '../styles/Layout.styles';

const AddAPhrase: React.FC = () => {
  const { lexicon } = useLexiconContext();

  return (
    <Main>
      <Top>
        <h1 className="bold xlarge">Say a phrase to teach it to you parrot</h1>
      </Top>
      <Middle>
        <Parrot {...{ language: lexicon?.language.name }} />
      </Middle>
    </Main>
  );
};

export default AddAPhrase;
