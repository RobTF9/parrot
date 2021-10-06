import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../data/userResource';
import { Main, Header, Footer, Block } from '../styles/Layout.styles';
import Button from '../components/Button';
import Input from '../components/Input';
import { validateUpdate } from '../utils/userValidators';
import Loading from '../components/Loading';

const Settings: React.FC = () => {
  const [user, userLoading] = getUser();
  const [update, updateLoading] = updateUser();

  const [errors, setErrors] = useState<UserSubmission>({});
  const [details, setDetails] = useState<UserSubmission>();

  useEffect(() => {
    if (user && !details) {
      setDetails(user.data);
    }
  }, [user]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
    setErrors({});
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!details) return;

    const validationErrors = validateUpdate(details);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      update(details);
    }
  };

  if (userLoading) return <Loading />;

  return (
    <Main as="form" onSubmit={onSubmit}>
      <Header>
        <h1 className="bold xlarge">Settings</h1>
        <p className="margin-t">Update your username, email and password</p>
      </Header>
      {details && (
        <Block>
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
              label: 'New password',
              value: details.password,
              name: 'password',
              onChange,
              type: 'password',
              error: errors.password,
            }}
          />
        </Block>
      )}
      <Footer>
        <Button loading={updateLoading} type="submit">
          Update settings
        </Button>
      </Footer>
    </Main>
  );
};

export default Settings;
