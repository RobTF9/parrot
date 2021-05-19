import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE } from '../../utils/constants';
import Tag from '../tag/tag.model';
import Word from './word.model';

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    // TODO: add validators for better error messaging

    const word = await Word.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      lexicon: req.session.lexicon?._id,
    });

    return res
      .status(200)
      .json({ data: word, message: SUCCESS_MESSAGE.WORD_CREATED });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const words = await Word.find({
      lexicon: req.session.lexicon?._id,
    })
      .lean()
      .exec();

    const data = [];

    if (words.length > 0) {
      for (const word of words) {
        if (word.tags.length > 0) {
          const tags = [];

          for (const tag of word.tags) {
            const found = await Tag.findById(tag);

            if (found) {
              tags.push(found.tag);
            }

            data.push({ ...word, tags });
          }
        } else {
          data.push(word);
        }
      }
    }

    return res.status(200).json({ data });
  } catch (error) {
    return next(new Error(error));
  }
};
