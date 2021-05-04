import { RequestHandler } from 'express';
import User from './user.model';

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user)
      .select('-password')
      .lean()
      .exec();

    res.status(200).json({ data: user });
  } catch (error) {
    next(new Error(error));
  }
};

export const updateUser: RequestHandler = async (_, res, next) => {
  try {
    res.send({
      message: 'User',
    });
  } catch (error) {
    next(new Error(error));
  }
};
