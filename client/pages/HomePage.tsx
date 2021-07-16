import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useAuthContext } from '../context/Auth';

const HomePage: React.FC = () => {
  const { signOut } = useAuthContext();

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
