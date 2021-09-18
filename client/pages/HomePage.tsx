import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useAuthContext } from '../context/Auth';
import { useLexiconContext } from '../context/Lexicon';
import { getItems } from '../data/itemResource';
import { Block, Header, Main } from '../styles/Layout.styles';
import Parrot from '../components/Parrot';
import { getUser } from '../data/userResource';

const HomePage: React.FC = () => {
  const { signOut } = useAuthContext();
  const { lexicon } = useLexiconContext();
  const [phrases, phrasesLoading] = getItems();
  const [user, userLoading] = getUser();

  if (phrasesLoading || userLoading) {
    return <Loading />;
  }

  if (lexicon && phrases && phrases.data.length === 0) {
    return <Redirect to="/phrase" />;
  }

  return (
    <Main>
      <Header>
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
      </Header>
      <Button {...{ action: signOut }}>Logout</Button>
    </Main>
  );
};

export default HomePage;
