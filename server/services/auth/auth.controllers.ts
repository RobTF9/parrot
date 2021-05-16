import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import User from '../../resources/user/user.model';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import config from '../../config';
import { resetPasswordEmail } from '../email/email.senders';

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.NEED_EMAIL_AND_PASSWORD, auth: false });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD,
        auth: false,
      });
    }

    const match = user && (await user.checkPassword(req.body.password));

    if (!match) {
      return res.status(401).json({
        message: ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD,
        auth: false,
      });
    }

    req.session.user = user._id;

    return res.status(201).send({
      message: SUCCESS_MESSAGE.SIGN_IN_SUCCESSFUL,
      auth: true,
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      return res.status(400).json({
        message: ERROR_MESSAGE.NEED_EMAIL_PASSWORD_USERNAME,
        auth: false,
      });
    }

    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({
        auth: false,
        message: ERROR_MESSAGE.EMAIL_IN_USE,
      });
    }

    const usernameExists = await User.findOne({ username: req.body.username });

    if (usernameExists) {
      return res.status(400).json({
        auth: false,
        message: ERROR_MESSAGE.USERNAME_IN_USE,
      });
    }

    const user = await User.create(req.body);
    req.session.user = user._id;

    return res.status(201).send({
      auth: true,
      message: SUCCESS_MESSAGE.SIGN_UP_SUCCESSFUL,
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const checkAuth: RequestHandler = async (req, res, next) => {
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

    if (req.session.lexicon) {
      return res.status(200).json({
        auth: true,
        message: SUCCESS_MESSAGE.AUTHORIZED,
        lexicon: req.session.lexicon,
      });
    }

    return res
      .status(200)
      .json({ auth: true, message: SUCCESS_MESSAGE.AUTHORIZED });
  } catch (error) {
    return next(new Error(error));
  }
};

export const signOut: RequestHandler = async (req, res, next) => {
  try {
    return req.session.destroy(() =>
      res.json({
        auth: false,
        message: SUCCESS_MESSAGE.SIGNED_OUT_SUCCESSFULLY,
      })
    );
  } catch (error) {
    return next(new Error(error));
  }
};

export const requestPasswordReset: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res
        .status(400)
        .send({ message: ERROR_MESSAGE.EMAIL_ADDRESS_REQUIRED });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .send({ message: ERROR_MESSAGE.EMAIL_ADDRESS_DOESNT_EXIST });
    }

    if (!user.token) {
      return res.status(401).json({ message: ERROR_MESSAGE.NOT_AUTHORIZED });
    }

    user.token = undefined;
    await user.save();

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, 8);

    user.token = {
      value: hash,
      createdAt: Date.now(),
    };

    await user.save();

    const link = `${config.client}reset/?token=${resetToken}&id=${user._id}`;
    resetPasswordEmail(user.email, link, user.username);

    return res.send({
      auth: false,
      message: SUCCESS_MESSAGE.RESET_LINK_SENT,
    });
  } catch (error) {
    return next(new Error(error));
  }
};

export const passwordReset: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.password || !req.body.token || !req.body._id) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.CANNOT_RESET_PASSWORD });
    }

    const user = await User.findOne({ _id: req.body._id });

    if (!user || !user.token || user.token === null) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.CANNOT_RESET_PASSWORD });
    }
    const tokenValid = await bcrypt.compare(req.body.token, user.token.value);

    if (!tokenValid) {
      res.status(400).send({ message: ERROR_MESSAGE.CANNOT_RESET_PASSWORD });
    }

    const hash = await bcrypt.hash(req.body.password, 8);

    await User.updateOne(
      {
        _id: req.body._id,
      },
      { $set: { password: hash, token: undefined } },
      { new: true }
    );

    return res.status(200).json({
      message: SUCCESS_MESSAGE.PASSWORD_RESET_SUCCESSFULLY,
    });
  } catch (error) {
    return next(new Error(error));
  }
};
