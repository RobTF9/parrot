import React from 'react';
import { Card } from '../../styles/Layout.styles';
import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import Input from '../../components/Input';
import userResource from './data/userResource';

const UpdateUser: React.FC = () => {
  const user = userResource();

  return (
    <Card as="form" onSubmit={user.onSubmit}>
      {(user.getLoading || user.updateLoading) && <Loading bg />}
      <h2 className="large bold border-b-s">Update your details</h2>
      <Input
        {...{
          label: 'Email',
          name: 'email',
          value: user.details.email,
          error: user.errors.email,
          onChange: user.onChange,
        }}
      />
      <Input
        {...{
          label: 'Username',
          name: 'username',
          value: user.details.username,
          error: user.errors.username,
          onChange: user.onChange,
        }}
      />
      <Button type="submit">Save changes</Button>
    </Card>
  );
};

export default UpdateUser;
