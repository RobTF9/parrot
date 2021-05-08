import React, { useState, useEffect } from 'react';
import { Card } from '../../styles/Layout.styles';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import Input from '../../components/Input';
import { getUser, updateUser } from '../../api/resources/user';
import { validateUpdate } from '../../utils/userValidators';
import { useMessageContext } from '../../context/Message';

const UpdateUser: React.FC = () => {
  const [user, getLoading] = getUser();
  const { updateMessage, hideMessage } = useMessageContext();
  const [update, updateLoading] = updateUser(undefined, (res) => {
    if (res.message) {
      updateMessage(res.message);
    }
  });
  const [errors, setErrors] = useState<UserSubmission>({});
  const [details, setDetails] = useState({
    email: '',
    username: '',
  });

  useEffect(() => {
    if (user?.data) {
      setDetails(user.data);
    }
  }, [user]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    hideMessage();
    setDetails({ ...details, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateUpdate(details);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      update(details);
    }
  };

  return (
    <Card as="form" onSubmit={onSubmit}>
      {(getLoading || updateLoading) && <Loading bg />}
      <h2 className="large bold border-b-s">Update your details</h2>
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
          label: 'Username',
          name: 'username',
          value: details.username,
          error: errors.username,
          onChange,
        }}
      />
      <Button type="submit">Save changes</Button>
    </Card>
  );
};

export default UpdateUser;
