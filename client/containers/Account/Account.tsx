import React from 'react';
import { useAuthContext } from '../../context/Auth';
import { TextButton } from '../../styles/Buttons.styles';
import { Flex } from '../../styles/Layout.styles';
import UpdateUser from './UpdateUser';

const Account: React.FC = () => {
  const { signOut } = useAuthContext();

  return (
    <>
      <Flex as="header">
        <h2 className="xxlarge bold">Your account</h2>
        <TextButton type="button" onClick={signOut}>
          Logout
        </TextButton>
      </Flex>
      <UpdateUser />
    </>
  );
};

export default Account;
