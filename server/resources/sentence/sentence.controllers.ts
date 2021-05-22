import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';
import Sentence from './sentence.model';
import { createNotification } from '../notification/notification.controllers';

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

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const sentences = await Sentence.find({
      lexicon: req.session.lexicon?._id,
    })
      .populate({ path: 'updatedBy', select: 'username' })
      .sort({ createdAt: 'desc' })
      .lean()
      .exec();

    return res.status(200).json({ data: sentences });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const sentence = await Sentence.findById(req.params.id).lean().exec();

    if (!sentence) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res.status(200).json({ data: sentence });
  } catch (error) {
    return next(new Error(error));
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const sentence = await Sentence.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedAt: undefined, updatedBy: req.session.user },
      { new: true }
    );

    if (!sentence) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    if (`${req.session.user}` !== `${sentence.createdBy}`) {
      createNotification(
        sentence.createdBy,
        req.session.user,
        'Sentence updated',
        sentence._id
      );
    }

    return res
      .status(200)
      .json({ data: sentence, message: SUCCESS_MESSAGE.SENTENCE_UPDATED });
  } catch (error) {
    return next(new Error(error));
  }
};
