import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { useLexiconContext } from '../context/Lexicon';
import { getItems } from '../data/itemResource';
import { Block, Main, UpperBlock } from '../styles/Layout.styles';
import Parrot from '../components/Parrot';
import { getUser } from '../data/userResource';
import useProgressService from '../hooks/useProgressService';
import Progress from '../components/Progress';

const HomePage: React.FC = () => {
  const { lexicon } = useLexiconContext();
  const [phrases, phrasesLoading] = getItems();
  const [user, userLoading] = getUser();
  const [loadingProgress, progress] = useProgressService(phrases?.data);

  if (phrasesLoading || userLoading || loadingProgress) {
    return <Loading />;
  }

  if (lexicon && phrases && phrases.data.length === 0) {
    return <Redirect to="/phrase" />;
  }

  return (
    <Main>
      <Block columns="1fr 150px">
        <h1 className="bold xlarge margin-b">
          Hey {user?.data.username}, here&apos;s your daily goal summary...
        </h1>
        <Parrot
          {...{
            language: lexicon?.language.name,
          }}
        />
      </Block>
      {progress && (
        <UpperBlock>
          <Progress {...{ progress }} />
        </UpperBlock>
      )}
    </Main>
  );
};

export default HomePage;
