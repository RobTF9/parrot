import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Modal } from '../../styles/Layout.styles';
import { validateEmail } from '../../utils/userValidators';
import Input from '../../components/Input';
import { Button } from '../../styles/Buttons.styles';
import { useAuthContext } from '../../context/Auth';

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
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal as="form" onSubmit={onSubmit}>
        <h2 className="xxlarge bold border-b">Reset your password</h2>
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
