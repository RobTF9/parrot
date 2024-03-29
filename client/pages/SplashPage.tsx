import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Parrot from '../components/Parrot';
import { Main, Header, UpperBlock, Footer } from '../styles/Layout.styles';

const SplashPage: React.FC = () => {
  return (
    <Main>
      <Header>
        <h1 className="bold xlarge">Welcome to Parrot</h1>
      </Header>
      <UpperBlock>
        <Parrot />
        <p className="margin-t-l">
          Create a virtual parrot and teach it phrases as you learn a new
          language! Your parrot will create games to help you consolidate your
          new vocabulary
        </p>
      </UpperBlock>
      <Footer>
        <Link to="/login">Login</Link>
        <Button to="/signup">Create a parrot</Button>
      </Footer>
    </Main>
  );
};

export default SplashPage;
