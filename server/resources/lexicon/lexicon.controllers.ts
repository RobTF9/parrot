import { RequestHandler } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import Lexicon from './lexicon.model';

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    const lexicon = await Lexicon.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
    });
    res.status(201).json({ data: lexicon });
  } catch (error) {
    next(new Error(error));
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
