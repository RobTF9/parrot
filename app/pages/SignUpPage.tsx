import React, { useState } from 'react';
import { useAuthContext } from '../context/Auth';
import Button from '../components/Button';
import Input from '../components/Input';
import { Bottom, Main, Middle, Top } from '../styles/Layout.styles';
import { validateSignup } from '../utils/userValidators';

const SignUpPage: React.FC = () => {
  const { signUp, authLoading } = useAuthContext();
  const [errors, setErrors] = useState<UserSubmission>({});
  const [details, setDetails] = useState({
    email: '',
    username: '',
    password: '',
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
    setErrors({});
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateSignup(details);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      signUp(details);
    }
  };

  return (
    <Main as="form" onSubmit={onSubmit}>
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
            error: errors.email,
            onChange,
          }}
        />
        <Input
          {...{
            label: 'Username',
            value: details.username,
            name: 'username',
            error: errors.username,
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
            error: errors.password,
          }}
        />
      </Middle>
      <Bottom>
        <Button loading={authLoading} type="submit">
          Submit details
        </Button>
      </Bottom>
    </Main>
  );
};

export default SignUpPage;
