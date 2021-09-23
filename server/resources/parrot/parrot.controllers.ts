import { RequestHandler } from 'express';
import config from '../../config';
import { parrotSharedWithYou } from '../../services/email/email.senders';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import User from '../user/user.model';
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

export const unshareParrot: RequestHandler = async (req, res, next) => {
  try {
    const userToRemove = await User.findOne({ email: req.body.email });
    const parrotToUpdate = await Parrot.findById(req.params.id);

    if (!userToRemove || !parrotToUpdate) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    parrotToUpdate.sharedWith = parrotToUpdate.sharedWith.filter(
      (userId) => userId === userToRemove._id
    );

    await parrotToUpdate.save();

    return res.status(200).json({
      data: parrotToUpdate,
      message: SUCCESS_MESSAGE.LEXICON_UNSHARED,
    });
  } catch (error) {
    return next(error);
  }
};

export const shareParrot: RequestHandler = async (req, res, next) => {
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

    const createdBy = await Parrot.findOne({
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

    const alreadyShared = await Parrot.findOne({
      _id: req.params.id,
      'sharedWith.0': { $exists: true },
    })
      .lean()
      .exec();

    if (alreadyShared) {
      return res.status(400).json({ message: ERROR_MESSAGE.ALREADY_SHARED });
    }

    const parrot = await Parrot.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.session.user,
      },
      { $push: { sharedWith: user._id } },
      { new: true, runValidators: true }
    )
      .lean()
      .exec();

    const sender = await User.findOne(req.session.user).lean().exec();

    if (config.client && sender) {
      parrotSharedWithYou(
        req.body.email,
        config.client,
        sender.username,
        user.username
      );
    }

    return res
      .status(200)
      .json({ data: parrot, message: SUCCESS_MESSAGE.LEXICON_SHARED });
  } catch (error) {
    return next(error);
  }
};

export const getShared: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.session;
    const parrots = await Parrot.find({
      sharedWith: user,
    })
      .populate('createdBy', 'username email')
      .populate('sharedWith', 'username email')
      .lean()
      .exec();

    res.status(200).json({ data: parrots });
  } catch (error) {
    next(error);
  }
};

export const getActive: RequestHandler = async (req, res, next) => {
  try {
    const parrot = await Parrot.findById(req.session.parrot?._id).lean().exec();

    res.status(200).json({ data: parrot });
  } catch (error) {
    next(error);
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
