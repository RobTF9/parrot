import { RequestHandler } from 'express';
import User from '../../resources/user/user.model';
import { ERROR_MESSAGE } from '../../utils/constants';

export const protect: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGE.NOT_AUTHORIZED, auth: false });
    }
    const user = await User.findById(req.session.user);

    if (!user) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGE.NOT_AUTHORIZED, auth: false });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

export const lexiconActive: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session.lexicon) {
      return res.status(400).json({ message: ERROR_MESSAGE.NO_LEXICON_ACTIVE });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

export default protect;
