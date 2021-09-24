import React from 'react';
import Loading from '../components/Loading';
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
      {phrases && (
        <StretchBlock as="ul" columns="1fr 1fr">
          {phrases.data.map((phrase) => (
            <li key={phrase._id}>{phrase.lang}</li>
          ))}
        </StretchBlock>
      )}
    </Main>
  );
};

export default Phrases;
