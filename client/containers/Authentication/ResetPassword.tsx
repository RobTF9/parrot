import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Modal } from '../../styles/Layout.styles';
import { Button } from '../../styles/Buttons.styles';
import Input from '../../components/Input';
import { validatePassword } from '../../utils/userValidators';
import { useAuthContext } from '../../context/Auth';

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
    <Container half>
      <h1 className="xlarge center lightest buffer">
        Welcome to <span className="bold">Parrot</span>
      </h1>
      <Modal as="form" onSubmit={onSubmit}>
        <h2 className="xxlarge bold border-b">Create a new password</h2>
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
        <Button type="submit">Reset password</Button>
      </Modal>
    </Container>
  );
};

export default ResetPassword;
