import React from 'react';
import { getRead } from '../../api/resources/notifications';
import NotificationList from '../../components/NotificationList';
import { Loading } from '../../styles/Animations.styles';
import { Flex } from '../../styles/Layout.styles';

const ReadNotifications: React.FC = () => {
  const [read, readLoading] = getRead();

  return (
    <>
      {readLoading && <Loading bg />}
      <Flex className="border-b-s">
        <h2 className="large bold">Read notifications</h2>
      </Flex>
      {read && <NotificationList {...{ notifications: read }} />}
    </>
  );
};

export default ReadNotifications;
