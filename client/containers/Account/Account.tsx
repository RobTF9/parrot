import React, { useState } from 'react';
import { useAuthContext } from '../../context/Auth';
import { TextButton } from '../../styles/Buttons.styles';
import { Flex } from '../../styles/Layout.styles';
import UpdateUser from './UpdateUser';
import Tabs from '../../components/Tabs';
import Notifications from './Notifications';

const Account: React.FC = () => {
  const { signOut } = useAuthContext();
  const [tab, setTab] = useState('Update');

  return (
    <>
      <Flex as="header">
        <h2 className="xxlarge bold">Your account</h2>
        <TextButton type="button" onClick={signOut}>
          Logout
        </TextButton>
      </Flex>
      <Tabs
        {...{
          set: setTab,
          state: tab,
          tabs: [
            {
              setting: 'Update',
              text: 'Update details',
            },
            {
              setting: 'Notifications',
              text: 'Notifications',
            },
          ],
        }}
      />
      {tab === 'Update' && <UpdateUser />}
      {tab === 'Notifications' && <Notifications />}
    </>
  );
};

export default Account;
