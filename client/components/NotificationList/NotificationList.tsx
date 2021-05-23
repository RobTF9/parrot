import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { NotificationWrapper } from './NotificationList.styles';

interface Props {
  notifications: {
    data: NotificationResource[];
  };
}

const NotificationList: React.FC<Props> = ({ notifications }) => {
  return notifications.data.length > 0 ? (
    <ol>
      {notifications.data.map(({ _id, message, sender, createdAt, url }) => (
        <NotificationWrapper key={_id}>
          <p>{message}</p>
          <em className="small">
            By {sender.username} at {formatDate(createdAt)}
          </em>
          <Link to={url}>View</Link>
        </NotificationWrapper>
      ))}
    </ol>
  ) : (
    <p>You have no new notifications</p>
  );
};

export default NotificationList;
