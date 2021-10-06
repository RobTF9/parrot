import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Header, Main, StretchBlock } from '../styles/Layout.styles';
import { useAuthContext } from '../context/Auth';
import { validateEmail } from '../utils/userValidators';
import Input from '../components/Input';
import Button from '../components/Button';

const ForgotPassword: React.FC = () => {
  const { resetPasswordEmail } = useAuthContext();
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [details, setDetails] = useState({ email: '' });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateEmail(details.email);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      resetPasswordEmail(details);
    }
  };

  return (
    <Main as="form" onSubmit={onSubmit}>
      <Header>
        <h1 className="bold xlarge">Forgotten password</h1>
        <p className="margin-t">
          Enter your email address and we&apos;ll send you a password reset link
        </p>
      </Header>
      <StretchBlock>
        <Input
          {...{
            label: 'Email',
            value: details.email,
            name: 'email',
            error: errors.email,
            onChange,
          }}
        />
      </StretchBlock>
      <Footer>
        <Link to="/login">Back to log in</Link>
        <Button type="submit">Submit details</Button>
      </Footer>
    </Main>
  );
};

export default ForgotPassword;
