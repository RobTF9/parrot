import React from 'react';
import { getUnread, markAsRead } from '../../api/resources/notifications';
import NotificationList from '../../components/NotificationList';
import { Loading } from '../../styles/Animations.styles';
import { TextButton } from '../../styles/Buttons.styles';
import { Flex } from '../../styles/Layout.styles';

const Notifications: React.FC = () => {
  const [unread, unreadLoading] = getUnread();
  const [markRead, markReadLoading] = markAsRead();

  return (
    <>
      {(unreadLoading || markReadLoading) && <Loading bg />}
      <Flex className="border-b-s">
        <h2 className="large bold">Unread notifications</h2>
        <TextButton type="button" onClick={() => markRead(undefined)}>
          Mark all as read
        </TextButton>
      </Flex>
      {unread && <NotificationList {...{ notifications: unread }} />}
    </>
  );
};

export default Notifications;
