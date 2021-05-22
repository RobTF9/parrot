import { RequestHandler } from 'express';
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

export const getNotifications: RequestHandler = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      recipient: req.session.user,
    })
      .populate({ path: 'resource' })
      .lean()
      .exec();

    return res.status(200).json({ data: notifications });
  } catch (error) {
    return next(new Error(error));
  }
};
