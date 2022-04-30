import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';
import Phrase from '../phrase/phrase.model';
import Tag from './tag.model';

export const createTag: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.tag) {
      return res.status(400).json({ message: ERROR_MESSAGE.TAG_INVALID });
    }

    const tag = await Tag.create({
      value: req.body.tag,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      parrot: req.session.parrot?._id,
    });

    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGE.TAG_CREATED, data: tag });
  } catch (error) {
    return next(error);
  }
};

export const updateTag: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.tag) {
      return res.status(400).json({ message: ERROR_MESSAGE.TAG_INVALID });
    }

    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { value: req.body.tag, updatedBy: req.session.user },
      { new: true }
    )
      .lean()
      .exec();

    if (!tag) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGE.TAG_UPDATED, data: tag });
  } catch (error) {
    return next(error);
  }
};

export const tagPhrase: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.tag || !req.body.phrase) {
      return res.status(400).json({ message: ERROR_MESSAGE.TAG_INVALID });
    }

    const tag = await Tag.findById(req.body.tag);
    const phrase = await Phrase.findById(req.body.phrase);

    if (!tag || !phrase) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    const updatedTag = await Tag.findByIdAndUpdate(
      tag._id,
      {
        $push: { phrases: phrase },
      },
      { new: true }
    );
    const updatedPhrase = await Phrase.findByIdAndUpdate(
      phrase._id,
      {
        $push: { tags: tag },
      },
      { new: true }
    ).populate({ path: 'tags', select: 'value' });

    return res.status(201).send({
      message: SUCCESS_MESSAGE.PHRASE_TAGGED,
      data: {
        tag: updatedTag,
        phrase: updatedPhrase,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// get all tags
