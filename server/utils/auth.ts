import { RequestHandler } from 'express';
import User from '../resources/user/user.model';
import { ERROR_MESSAGE } from './constants';

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send(ERROR_MESSAGE.NEED_EMAIL_AND_PASSWORD);
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).send(ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD);
    }

    const match = user && (await user.checkPassword(req.body.password));

    if (!match) {
      res.status(401).send(ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD);
    }

    res.send(user);
  } catch (error) {
    next(new Error(error));
  }
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      res.status(400).send(ERROR_MESSAGE.NEED_EMAIL_PASSWORD_USERNAME);
    }

    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    next(new Error(error));
  }
};
