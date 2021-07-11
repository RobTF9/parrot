import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/Auth';
import Button from '../components/Button';
import Input from '../components/Input';
import { Bottom, Main, Middle, Top } from '../styles/Layout.styles';
import { validateSignIn } from '../utils/userValidators';

const LoginPage: React.FC = () => {
  const { signIn } = useAuthContext();
  const [errors, setErrors] = useState<UserSubmission>({});
  const [details, setDetails] = useState({ email: '', password: '' });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
    setErrors({});
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateSignIn(details);

    console.log('Submitting');

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      signIn(details);
    }
  };

  return (
    <Main as="form" onSubmit={onSubmit}>
      <Top>
        <h1 className="bold xlarge">Login to Parrot</h1>
      </Top>
      <Middle>
        <Input
          {...{
            label: 'Email',
            value: details.email,
            name: 'email',
            error: errors.email,
            onChange,
          }}
        />
        <Input
          {...{
            label: 'Password',
            value: details.password,
            name: 'password',
            error: errors.password,
            onChange,
            type: 'password',
          }}
        />
      </Middle>
      <Bottom>
        <Link to="/forgot-password">Forgotten your password?</Link>
        <Button type="submit">Login</Button>
      </Bottom>
    </Main>
  );
};

export default LoginPage;
