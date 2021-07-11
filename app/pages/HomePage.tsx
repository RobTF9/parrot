import React from 'react';
import Button from '../components/Button';
import { useAuthContext } from '../context/Auth';

const HomePage: React.FC = () => {
  const { signOut } = useAuthContext();

  return <Button {...{ action: signOut }}>Logout</Button>;
};

export default HomePage;
