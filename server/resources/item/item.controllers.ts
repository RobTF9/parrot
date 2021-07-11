import { RequestHandler } from 'express';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../utils/constants';
import Item from './item.model';

export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      lexicon: req.session.lexicon?._id,
    });

    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGE.ITEM_CREATED, data: item });
  } catch (error) {
    return next(new Error(error));
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedAt: undefined, updatedBy: req.session.user },
      { new: true }
    );

    if (!item) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ data: item, message: SUCCESS_MESSAGE.ITEM_UPDATED });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const items = await Item.find({
      lexicon: req.session.lexicon?._id,
    })
      .populate({ path: 'updatedBy', select: 'username' })
      .sort({ createdAt: 'desc' })
      .lean()
      .exec();

    return res.status(200).json({ data: items });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).lean().exec();

    if (!item) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res.status(200).json({ data: item });
  } catch (error) {
    return next(new Error(error));
  }
};
