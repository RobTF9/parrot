import { ObjectId } from 'mongoose';
import Notification from './notification.model';

export const createNotification = async (
  recipient: ObjectId,
  sender: { [key: string]: string } | undefined,
  resource: ObjectId,
  message: string
): Promise<void> => {
  await Notification.create({
    recipient,
    sender,
    resource,
    message,
  });
};
