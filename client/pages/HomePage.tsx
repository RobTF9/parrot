import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { useAuthContext } from '../context/Auth';
import { useLexiconContext } from '../context/Lexicon';
import { getItems } from '../data/itemResource';

const HomePage: React.FC = () => {
  const { signOut } = useAuthContext();
  const { lexicon } = useLexiconContext();
  const [phrases, phrasesLoading] = getItems();

  if (phrasesLoading) {
    return <Loading />;
  }

  if (lexicon && phrases && phrases.data.length === 0) {
    return <Redirect to="/phrase" />;
  }

  return (
    <>
      <Link to="/phrase">Add a phrase</Link>
      <Link to="/parrot">Create a parrot</Link>
      <Link to="/pick">Pick a parrot</Link>
      <Button {...{ action: signOut }}>Logout</Button>
    </>
  );
};

export default HomePage;
