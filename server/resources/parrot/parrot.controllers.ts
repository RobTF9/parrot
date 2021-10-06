import { RequestHandler } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import Parrot from './parrot.model';

export const createOne: RequestHandler = async (req, res, next) => {
  try {
    const parrots = await Parrot.find({
      createdBy: req.session.user,
      language: req.body.language,
    })
      .lean()
      .exec();

    if (parrots.length > 0) {
      return res.status(400).json({ message: ERROR_MESSAGE.LEXICON_EXISTS });
    }

    const parrot = await Parrot.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
    });

    return res
      .status(201)
      .json({ data: parrot, message: SUCCESS_MESSAGE.LEXICON_CREATED });
  } catch (error) {
    return next(error);
  }
};

export const getYours: RequestHandler = async (req, res, next) => {
  try {
    const parrots = await Parrot.find({ createdBy: req.session.user })
      .sort({ createdAt: 'desc' })
      .populate('createdBy', 'username email')
      .populate('sharedWith', 'username email')
      .lean()
      .exec();

    return res.status(200).json({ data: parrots });
  } catch (error) {
    return next(error);
  }
};

export const setActive: RequestHandler = async (req, res, next) => {
  try {
    const parrot = await Parrot.findOne({ _id: req.params.id });

    if (!parrot) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    req.session.parrot = {
      _id: parrot._id,
      language: {
        name: parrot.language.name,
        htmlCode: parrot.language.htmlCode,
        langCode: parrot.language.langCode,
      },
    };

    return res.status(200).json({
      message: SUCCESS_MESSAGE.LEXICON_ACTIVATED,
      parrot: req.session.parrot,
    });
  } catch (error) {
    return next(error);
  }
};

export const getActive: RequestHandler = async (req, res, next) => {
  try {
    const parrot = await Parrot.findById(req.session.parrot?._id).lean().exec();

    return res.status(200).json({ data: parrot });
  } catch (error) {
    return next(error);
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const parrot = await Parrot.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedAt: undefined, updatedBy: req.session.user },
      { new: true }
    );

    if (!parrot) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    console.log(SUCCESS_MESSAGE.PARROT_UPDATED);

    return res
      .status(200)
      .json({ data: parrot, message: { ...SUCCESS_MESSAGE.PARROT_UPDATED } });
  } catch (error) {
    return next(error);
  }
};
