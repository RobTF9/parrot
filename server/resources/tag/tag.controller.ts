import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';
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

// update
export const updateTag: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.tag) {
      return res.status(400).json({ message: ERROR_MESSAGE.TAG_INVALID });
    }

    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { value: req.body.tag },
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
      .status(200)
      .json({ message: SUCCESS_MESSAGE.TAG_UPDATED, data: tag });
  } catch (error) {
    return next(error);
  }
};

// get all

// tagPhrase
