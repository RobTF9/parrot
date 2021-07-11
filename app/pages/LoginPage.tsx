import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { Bottom, Main, Middle, Top } from '../styles/Layout.styles';

const LoginPage: React.FC = () => {
  const [details, setDetails] = useState({ email: '', password: '' });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  return (
    <Main>
      <Top>
        <h1 className="bold xlarge">Login to Parrot</h1>
      </Top>
      <Middle>
        <Input
          {...{
            label: 'Email',
            value: details.email,
            name: 'email',
            onChange,
          }}
        />
        <Input
          {...{
            label: 'Password',
            value: details.password,
            name: 'password',
            onChange,
            type: 'password',
          }}
        />
      </Middle>
      <Bottom>
        <Link to="/forgot-password">Forgotten your password?</Link>
        <Button>Login</Button>
      </Bottom>
    </Main>
  );
};

export default LoginPage;
