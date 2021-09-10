import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE } from '../../utils/constants';
import User from './user.model';

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user)
      .select('-password')
      .lean()
      .exec();

    return res.status(200).json({ data: user });
  } catch (error) {
    return next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.session.user },
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res
      .status(200)
      .json({ data: user, message: SUCCESS_MESSAGE.USER_UPDATED });
  } catch (error) {
    return next(error);
  }
};
