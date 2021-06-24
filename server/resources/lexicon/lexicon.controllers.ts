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
      .populate('sharedWith', 'username email')
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
      req.session.lexicon = {
        _id: lexicon._id,
        language: {
          name: lexicon.language.name,
          htmlCode: lexicon.language.htmlCode,
          langCode: lexicon.language.langCode,
        },
      };

      res.status(200).json({
        message: SUCCESS_MESSAGE.LEXICON_ACTIVATED,
        lexicon: req.session.lexicon,
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

export const shareLexicon: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.EMAIL_ADDRESS_REQUIRED });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.EMAIL_ADDRESS_DOESNT_EXIST });
    }

    const createdBy = await Lexicon.findOne({
      _id: req.params.id,
      createdBy: user._id,
    })
      .lean()
      .exec();

    if (createdBy) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.CANT_SHARE_WITH_SELF });
    }

    const alreadyShared = await Lexicon.findOne({
      _id: req.params.id,
      sharedWith: user._id,
    })
      .lean()
      .exec();

    if (alreadyShared) {
      return res.status(400).json({ message: ERROR_MESSAGE.ALREADY_SHARED });
    }

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

    return res
      .status(200)
      .json({ data: lexicon, message: SUCCESS_MESSAGE.LEXICON_SHARED });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getShared: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.session;
    const lexicons = await Lexicon.find({
      sharedWith: user,
    })
      .populate('createdBy', 'username email')
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
