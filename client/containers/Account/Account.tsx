import React from 'react';
import { useAuthContext } from '../../context/Auth';
import { Button } from '../../styles/Buttons.styles';
import UpdateUser from './UpdateUser';

const Account: React.FC = () => {
  const { signOut } = useAuthContext();

  return (
    <>
      <h1 className="xxlarge bold margin-b">Your account</h1>
      <UpdateUser />
      <Button type="button" onClick={signOut}>
        Logout
      </Button>
    </>
  );
};

export default Account;
