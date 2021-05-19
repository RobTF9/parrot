import { RequestHandler } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import Tag from './tag.model';

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const tags = await Tag.find({
      lexicon: req.session.lexicon?._id,
    });

    return res.status(200).json({ data: tags });
  } catch (error) {
    return next(new Error(error));
  }
};

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.tag || req.body.tag.trim() === '') {
      return res.status(400).json({ message: ERROR_MESSAGE.TAG_EMPTY });
    }

    const tag = await Tag.create({
      tag: req.body.tag,
      createdBy: req.session.user,
      lexicon: req.session.lexicon?._id,
    });

    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGE.TAG_CREATED, data: tag });
  } catch (error) {
    return next(new Error(error));
  }
};
