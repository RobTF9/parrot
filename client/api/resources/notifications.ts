import { CACHE } from '../../utils/constants';
import { APIGiver, APIReciever, getMany, updateOne } from '../crud';

export const getUnread: APIReciever<NotificationResource[]> = () =>
  getMany(CACHE.NOTIFICATION, '/api/notification');

export const getRead: APIReciever<NotificationResource[]> = () =>
  getMany(CACHE.NOTIFICATION_READ, '/api/notification/read');

export const markAsRead: APIGiver<undefined, NotificationResource[]> = () =>
  updateOne(CACHE.NOTIFICATION, '/api/notification');
