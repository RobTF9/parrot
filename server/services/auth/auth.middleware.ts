import { RequestHandler } from 'express';
import User from '../../resources/user/user.model';
import { ERROR_MESSAGE } from '../../utils/constants';

export const protect: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session.user) {
      res
        .status(401)
        .json({ message: ERROR_MESSAGE.NOT_AUTHORIZED, auth: false });
    } else {
      const user = await User.findById(req.session.user);

      if (!user) {
        res
          .status(401)
          .json({ message: ERROR_MESSAGE.NOT_AUTHORIZED, auth: false });
      } else {
        next();
      }
    }
  } catch (error) {
    next(new Error(error));
  }
};

export default protect;
