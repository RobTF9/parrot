import React from 'react';
import Input from '../components/Input';
import Loading from '../components/Loading';
import PhraseList from '../components/PhraseList';
import { getPhrases } from '../data/phraseResource';
import useSearchQuery from '../hooks/useSearchQuery';
import { Main, Header, StretchBlock } from '../styles/Layout.styles';

const Phrases: React.FC = () => {
  const [query, setQuery, isLoading, phrases] = useSearchQuery(getPhrases);
  if (isLoading) return <Loading />;

  return (
    <Main>
      <Header>
        <h1 className="bold xlarge">Phrases</h1>
        {!phrases ||
          (phrases?.data.length === 0 && (
            <p className="margin-t">You haven&apos;t added any phrases yet</p>
          ))}
      </Header>
      {phrases && (
        <StretchBlock>
          <Input
            {...{
              label: 'Search phrases',
              name: 'search',
              value: query,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                setQuery(event.target.value);
              },
            }}
          />
          <PhraseList {...{ phrases: phrases.data }} />
        </StretchBlock>
      )}
    </Main>
  );
};

export default Phrases;
