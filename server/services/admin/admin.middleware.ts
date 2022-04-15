import { RequestHandler } from 'express';
import User from '../../resources/user/user.model';
import { ERROR_MESSAGE } from '../../utils/constants';

export const checkIsAdmin: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user);

    if (!user || user.role !== 'overlord') {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGE.NOT_AUTHORIZED, admin: false });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
