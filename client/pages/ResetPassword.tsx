import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer, Header, Main, StretchBlock } from '../styles/Layout.styles';
import { useAuthContext } from '../context/Auth';
import { validatePassword } from '../utils/userValidators';
import Input from '../components/Input';
import Button from '../components/Button';

const ResetPassword: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const { hideMessage, resetPassword } = useAuthContext();
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [details, setDetails] = useState({
    password: '',
    token: query.get('token') || '',
    _id: query.get('id') || '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    hideMessage();
    setErrors({});
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validatePassword(details.password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      resetPassword(details);
    }
  };

  return (
    <Main as="form" onSubmit={onSubmit}>
      <Header>
        <h1 className="bold xlarge">Reset your password</h1>
      </Header>
      <StretchBlock>
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
      </StretchBlock>
      <Footer>
        <Button type="submit">Reset password</Button>
      </Footer>
    </Main>
  );
};

export default ResetPassword;
