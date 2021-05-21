import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE } from '../../utils/constants';
import Sentence from './sentence.model';

export const createSentence: RequestHandler = async (req, res, next) => {
  try {
    const sentence = await Sentence.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      lexicon: req.session.lexicon?._id,
    });

    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGE.SENTENCE_CREATED, data: sentence });
  } catch (error) {
    return next(new Error(error));
  }
};
