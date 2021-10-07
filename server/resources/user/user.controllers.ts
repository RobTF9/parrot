import { RequestHandler } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
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
    const { username, email, password } = req.body;
    const user = await User.findOne({ _id: req.session.user });

    if (!user) {
      return res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER });
    }

    if (user) {
      if (username) {
        user.username = username;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
    }

    await user.save();

    return res.status(200).json({
      data: user.getPublicFields(),
      message: SUCCESS_MESSAGE.USER_UPDATED,
    });
  } catch (error) {
    return next(error);
  }
};
