import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Modal } from '../../styles/Layout.styles';
import Message from '../../components/Message';
import { Button } from '../../styles/Buttons.styles';
import Input from '../../components/Input';
import { post } from '../../utils/fetch';
import { validatePassword } from '../../utils/userValidators';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FC = () => {
  const query = useQuery();

  const [errors, setErrors] = useState<{ password?: string }>({});
  const [details, setDetails] = useState({
    password: '',
    token: query.get('token') || '',
    _id: query.get('id') || '',
  });

  const [message, setMessage] = useState<
    { text: string; type: string } | undefined
  >();

  const sendNewPassword = async () => {
    try {
      if (details.token === null || details._id === null) {
        setMessage({ text: "Can't find correct parameters", type: 'error' });
      }

      const response = await post<
        { password: string; token: string; _id: string },
        { message: string }
      >('/auth/reset', details);

      console.log(response);

      setMessage({ text: response.message, type: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validatePassword(details.password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      sendNewPassword();
    }
  };

  return (
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal as="form" onSubmit={onSubmit}>
        <h2 className="xxlarge bold border-b">Create a new password</h2>
        {message && (
          <Message {...{ type: message.type, message: message.text }} />
        )}
        {!message || message.type !== 'success' ? (
          <>
            <Input
              {...{
                label: 'Password',
                name: 'password',
                value: details.password,
                error: errors.password,
                type: 'password',
                onChange,
              }}
            />{' '}
            <Button type="submit">Reset password</Button>
          </>
        ) : (
          <p className="center border-t">
            Go to <Link to="/sign-in">Sign in</Link>
          </p>
        )}
      </Modal>
    </Container>
  );
};

export default ResetPassword;
