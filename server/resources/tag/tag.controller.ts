import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';
import Tag from './tag.model';

export const createTag: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.tag) {
      return res.status(400).json({ message: 'tag dont exist' });
    }

    const lowerCaseTag = req.body.tag.toLowerCase();
    const existingTag = await Tag.findOne({ value: lowerCaseTag });

    if (existingTag) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.TAG_INVALID, existingTag });
    }

    const createdTag = await Tag.create({
      value: req.body.tag,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      parrot: req.session.parrot?._id,
    });

    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGE.TAG_CREATED, data: createdTag });
  } catch (error) {
    return next(error);
  }
};
