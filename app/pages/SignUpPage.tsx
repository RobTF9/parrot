import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Bottom, Main, Middle, Top } from '../styles/Layout.styles';

const SignUpPage: React.FC = () => {
  const [details, setDetails] = useState({
    email: '',
    username: '',
    password: '',
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  return (
    <Main>
      <Top>
        <h1 className="bold xlarge">Create a Parrot</h1>
        <p className="margin-t">
          Before we create your parrot we need some details
        </p>
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
            label: 'Username',
            value: details.username,
            name: 'username',
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
        <Button>Sign up</Button>
      </Bottom>
    </Main>
  );
};

export default SignUpPage;
