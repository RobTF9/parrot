import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Modal } from '../../styles/Layout.styles';
import { validateEmail } from '../../utils/userValidators';
import Input from '../../components/Input';
import { post } from '../../api/fetch';
import Message from '../../components/Message';
import { Button } from '../../styles/Buttons.styles';

const ForgotPassword: React.FC = () => {
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [details, setDetails] = useState({ email: '' });

  const [message, setMessage] = useState<
    { text: string; type: string } | undefined
  >();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const sendEmailForReset = async () => {
    try {
      const response = await post<{ email: string }, { message: string }>(
        '/auth/forgot',
        details
      );
      setMessage({ text: response.message, type: 'success' });
    } catch (error) {
      setMessage({ text: error, type: 'error' });
    }
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateEmail(details.email);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      sendEmailForReset();
    }
  };

  return (
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal as="form" onSubmit={onSubmit}>
        <h2 className="xxlarge bold border-b">Reset your password</h2>
        {message && (
          <Message {...{ type: message.type, message: message.text }} />
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
        <Button>Send reset request</Button>
        <p className="center border-t">
          Go back to <Link to="/sign-in">Sign in</Link>
        </p>
      </Modal>
    </Container>
  );
};

export default ForgotPassword;
