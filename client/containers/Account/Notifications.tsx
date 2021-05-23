import React from 'react';
import { getUnread } from '../../api/resources/notifications';
import NotificationList from '../../components/NotificationList';
import { Loading } from '../../styles/Animations.styles';

const Notifications: React.FC = () => {
  const [unread, unreadLoading] = getUnread();
  return (
    <>
      {unreadLoading && <Loading bg />}
      <h2 className="large bold border-b-s">Notifications</h2>
      {unread && <NotificationList {...{ notifications: unread }} />}
    </>
  );
};

export default Notifications;
