import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import PhraseForm from '../components/PhraseForm';
import { getPhrase, updatePhrase } from '../data/phraseResource';
import { Header, Main, StretchBlock } from '../styles/Layout.styles';
import { useParrotContext } from '../context/Parrot';

const EditPhrase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recieved, isLoading] = getPhrase(id);
  const [update, updateLoading] = updatePhrase(id);
  const [phrase, setPhrase] = useState<PhraseSubmission | undefined>(undefined);
  const { parrot } = useParrotContext();

  useEffect(() => {
    if (recieved && !phrase) {
      setPhrase(recieved.data);
    }
  }, [recieved]);

  if (isLoading || updateLoading) return <Loading />;

  return (
    <Main>
      {phrase && parrot && (
        <>
          <Header>
            <h1 className="bold xlarge margin-b">Edit {phrase.lang}</h1>
          </Header>
          <StretchBlock>
            <PhraseForm
              {...{
                phrase,
                loading: isLoading,
                setPhrase,
                mutate: update,
                language: parrot.language.name,
              }}
            />
          </StretchBlock>
        </>
      )}
    </Main>
  );
};

export default EditPhrase;
