import { CACHE } from '../../utils/constants';
import { APIReciever, getMany } from '../crud';

export const getUnread: APIReciever<NotificationResource[]> = () =>
  getMany(CACHE.NOTIFICATION, '/api/notification');
