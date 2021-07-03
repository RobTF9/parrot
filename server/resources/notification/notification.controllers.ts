import { RequestHandler } from 'express';
import { ObjectId } from 'mongoose';
import { SUCCESS_MESSAGE } from '../../utils/constants';
import Notification from './notification.model';

export const createNotification = async (
  recipient: ObjectId | string,
  sender: { [key: string]: string } | undefined,
  url: string,
  message: string
): Promise<void> => {
  await Notification.create({
    recipient,
    sender,
    url,
    message,
  });
};

export const getUnread: RequestHandler = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      recipient: req.session.user,
      read: false,
    })
      .populate([
        { path: 'recipient', select: 'username' },
        { path: 'sender', select: 'username' },
      ])
      .lean()
      .exec();

    return res.status(200).json({ data: notifications });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getRead: RequestHandler = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      recipient: req.session.user,
      read: true,
    })
      .lean()
      .exec();

    return res.status(200).json({ data: notifications });
  } catch (error) {
    return next(new Error(error));
  }
};

export const markAsRead: RequestHandler = async (req, res, next) => {
  try {
    const notifications = await Notification.updateMany(
      { read: false, recipient: req.session.user },
      { read: true }
    );

    return res.status(200).json({
      message: SUCCESS_MESSAGE.NOTIFICATIONS_READ,
      data: notifications,
    });
  } catch (error) {
    return next(new Error(error));
  }
};
