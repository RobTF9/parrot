import { RequestHandler } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import Word from './word.model';

export const createWord: RequestHandler = async (req, res, next) => {
  try {
    const word = await Word.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      lexicon: req.session.lexicon?._id,
    });

    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGE.WORD_CREATED, data: word });
  } catch (error) {
    return next(new Error(error));
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const word = await Word.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedAt: undefined },
      { new: true }
    );

    if (!word) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ data: word, message: SUCCESS_MESSAGE.WORD_UPDATED });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const words = await Word.find({
      lexicon: req.session.lexicon?._id,
    })
      .sort({ createdAt: 'desc' })
      .lean()
      .exec();

    return res.status(200).json({ data: words });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const word = await Word.findById(req.params.id).lean().exec();

    if (!word) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res.status(200).json({ data: word });
  } catch (error) {
    return next(new Error(error));
  }
};
