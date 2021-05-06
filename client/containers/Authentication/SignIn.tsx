import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';
import { Container, Modal } from '../../styles/Layout.styles';
import Input from '../../components/Input';
import { Button } from '../../styles/Buttons.styles';
import { validateSignIn } from '../../utils/userValidators';
import Message from '../../components/Message';

const SignIn: React.FC = () => {
  const { signIn, errorMessage } = useAuthContext();
  const [errors, setErrors] = useState<UserSubmission>({});
  const [details, setDetails] = useState({ email: '', password: '' });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDetails({ ...details, [event.target.name]: event.target.value });

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateSignIn(details);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      signIn(details);
    }
  };

  return (
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>

      <Modal as="form" onSubmit={onSubmit}>
        <h2 className="xxlarge bold border-b">Sign in</h2>
        {errorMessage && (
          <Message {...{ type: 'error', message: errorMessage }} />
        )}
        <Input
          {...{
            label: 'Email',
            name: 'email',
            value: details.email,
            error: errors.email,
            onChange,
          }}
        />
        <Input
          {...{
            label: 'Password',
            name: 'password',
            value: details.password,
            error: errors.password,
            type: 'password',
            onChange,
          }}
        />
        <Button type="submit">Sign in</Button>
        <p className="border-t center">
          Not got an account?{' '}
          <Link to="/create-account">Create an account</Link>
        </p>
        <p className="center">
          <Link to="/forgot-password">Forgotten your password?</Link>
        </p>
      </Modal>
    </Container>
  );
};

export default SignIn;
