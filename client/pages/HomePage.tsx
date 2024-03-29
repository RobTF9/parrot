import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { useParrotContext } from '../context/Parrot';
import { getPhrases } from '../data/phraseResource';
import { Header, Main, UpperBlock } from '../styles/Layout.styles';
import Parrot from '../components/Parrot';
import { getUser } from '../data/userResource';
import useProgressService from '../hooks/useProgressService';
import Progress from '../components/Progress';

const HomePage: React.FC = () => {
  const { parrot } = useParrotContext();
  const [phrases, phrasesLoading] = getPhrases();
  const [user, userLoading] = getUser();
  const [loadingProgress, progress] = useProgressService(phrases?.data);

  if (phrasesLoading || userLoading || loadingProgress) {
    return <Loading />;
  }

  if (parrot && phrases && phrases.data.length === 0) {
    return <Redirect to="/phrase" />;
  }

  return (
    <Main>
      <Header columns="1fr 150px">
        <div>
          <h1 className="bold xlarge margin-b">Hey {user?.data.username}</h1>
          <p>
            You&apos;re teaching your {parrot?.language.name} parrot today.{' '}
            <Link to="/pick">Switch parrot</Link>
          </p>
        </div>
        <Parrot
          {...{
            language: parrot?.language.name,
          }}
        />
      </Header>
      {progress && (
        <UpperBlock>
          <Progress {...{ progress }} />

          <p className="border-t">
            Are the goals you set holding you back?{' '}
            <Link to="/edit">Edit goals</Link>
          </p>
        </UpperBlock>
      )}
    </Main>
  );
};

export default HomePage;
