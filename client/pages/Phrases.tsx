import React from 'react';
import Loading from '../components/Loading';
import PhraseList from '../components/PhraseList';
import { getPhrases } from '../data/phraseResource';
import { Main, Header, StretchBlock } from '../styles/Layout.styles';

const Phrases: React.FC = () => {
  const [phrases, isLoading] = getPhrases();

  if (isLoading) return <Loading />;

  return (
    <Main>
      <Header>
        <h1 className="bold xlarge">Phrases</h1>
      </Header>
      <StretchBlock>
        {phrases && <PhraseList {...{ phrases: phrases.data }} />}
      </StretchBlock>
    </Main>
  );
};

export default Phrases;
