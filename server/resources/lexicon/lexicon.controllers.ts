import { RequestHandler } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import User from '../user/user.model';
import Lexicon from './lexicon.model';

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    const lexicons = await Lexicon.find({
      createdBy: req.session.user,
      language: req.body.language,
    })
      .lean()
      .exec();

    if (lexicons.length > 0) {
      console.log('Exists');
      return res.status(400).json({ message: ERROR_MESSAGE.LEXICON_EXISTS });
    }

    const lexicon = await Lexicon.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
    });

    return res
      .status(201)
      .json({ data: lexicon, message: SUCCESS_MESSAGE.LEXICON_CREATED });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getYours: RequestHandler = async (req, res, next) => {
  try {
    const lexicons = await Lexicon.find({ createdBy: req.session.user })
      .sort({ createdAt: 'desc' })
      .lean()
      .exec();

    res.status(200).json({ data: lexicons });
  } catch (error) {
    next(new Error(error));
  }
};

export const setActive: RequestHandler = async (req, res, next) => {
  try {
    const lexicon = await Lexicon.findOne({ _id: req.params.id });

    if (!lexicon) {
      res.status(404).json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    if (lexicon) {
      req.session.lexicon = lexicon._id;
      res.status(200).json({
        message: SUCCESS_MESSAGE.LEXICON_ACTIVATED,
        lexicon: lexicon._id,
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

export const shareLexicon: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email) {
      res.status(400).json({ message: ERROR_MESSAGE.EMAIL_ADDRESS_REQUIRED });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res
        .status(400)
        .json({ message: ERROR_MESSAGE.EMAIL_ADDRESS_DOESNT_EXIST });
    } else {
      const lexicon = await Lexicon.findOneAndUpdate(
        {
          _id: req.params.id,
          createdBy: req.session.user,
        },
        { $push: { sharedWith: user._id } },
        { new: true, runValidators: true }
      )
        .lean()
        .exec();

      if (!lexicon) {
        res.status(404).json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
      }

      res
        .status(200)
        .json({ data: lexicon, message: SUCCESS_MESSAGE.LEXICON_SHARED });
    }
  } catch (error) {
    next(new Error(error));
  }
};

export const getShared: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.session;
    const lexicons = await Lexicon.find({
      sharedWith: user,
    })
      .lean()
      .exec();

    const data = [];

    for (const lexicon of lexicons) {
      const u = await User.findOne({ _id: lexicon.createdBy }).lean().exec();
      data.push({ ...lexicon, createdBy: u?.username });
    }

    res.status(200).json({ data });
  } catch (error) {
    next(new Error(error));
  }
};
