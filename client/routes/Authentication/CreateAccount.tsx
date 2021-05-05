import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { useAuthContext } from '../../context/Auth';
import { Button } from '../../styles/Buttons.styles';
import { Container, Modal } from '../../styles/Layout.styles';

const CreateAccount: React.FC = () => {
  const { signUp } = useAuthContext();

  const [details, setDetails] = useState({
    email: '',
    password: '',
    username: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDetails({ ...details, [event.target.name]: event.target.value });

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(details);
  };

  return (
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal as="form" onSubmit={onSubmit}>
        <h2 className="xxlarge bold border--bottom">Create your account</h2>
        <Input
          {...{
            label: 'Email',
            name: 'email',
            value: details.email,
            onChange,
          }}
        />
        <Input
          {...{
            label: 'Username',
            name: 'username',
            value: details.username,
            onChange,
          }}
        />
        <Input
          {...{
            label: 'Password',
            name: 'password',
            value: details.password,
            type: 'password',
            onChange,
          }}
        />
        <Button type="submit">Create account</Button>
        <p className="border--top center">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </Modal>
    </Container>
  );
};

export default CreateAccount;
