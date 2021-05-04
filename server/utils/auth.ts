import { RequestHandler } from 'express';
import User from '../resources/user/user.model';
import { ERROR_MESSAGE } from './constants';

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.NEED_EMAIL_AND_PASSWORD });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD });
    }

    const match = user && (await user.checkPassword(req.body.password));

    if (!match) {
      res
        .status(401)
        .json({ message: ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD });
    }

    req.session.user = user._id;

    return res.status(201).send({
      auth: true,
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      res
        .status(400)
        .json({ message: ERROR_MESSAGE.NEED_EMAIL_PASSWORD_USERNAME });
    }

    const user = await User.create(req.body);
    req.session.user = user._id;

    res.status(201).send({
      auth: true,
    });
  } catch (error) {
    next(new Error(error));
  }
};

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
