import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';
import Phrase from './phrase.model';

export const createPhrase: RequestHandler = async (req, res, next) => {
  try {
    const alreadyCreated = await Phrase.findOne({
      parrot: req.session.parrot?._id,
      lang: req.body.lang,
    });

    if (alreadyCreated) {
      return res.status(400).json({ message: ERROR_MESSAGE.DUPLICATE_PHRASE });
    }

    const phrase = await Phrase.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      parrot: req.session.parrot?._id,
    });

    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGE.PHRASE_CREATED, data: phrase });
  } catch (error) {
    return next(error);
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const phrase = await Phrase.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedAt: undefined, updatedBy: req.session.user },
      { new: true }
    );

    if (!phrase) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ data: phrase, message: SUCCESS_MESSAGE.PHRASE_UPDATED });
  } catch (error) {
    return next(error);
  }
};

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const query: PhraseQuery = {
      parrot: req.session.parrot?._id,
    };

    if (req.query.phrase) {
      const regex = new RegExp(`${req.query.phrase}`, 'i');
      query.$or = [
        { lang: { $regex: regex } },
        { pron: { $regex: regex } },
        { tran: { $regex: regex } },
      ];
    }

    const phrases = await Phrase.find(query)
      .populate({ path: 'updatedBy', select: 'username' })
      .sort({ createdAt: 'desc' })
      .lean()
      .exec();

    return res.status(200).json({ data: phrases });
  } catch (error) {
    return next(error);
  }
};

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const phrase = await Phrase.findById(req.params.id).lean().exec();

    if (!phrase) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res.status(200).json({ data: phrase });
  } catch (error) {
    return next(error);
  }
};
