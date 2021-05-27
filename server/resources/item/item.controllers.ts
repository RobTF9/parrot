import { RequestHandler } from 'express';
import Item from './item.model';

export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await Item.find({ lexicon: req.session.lexicon?._id });

    return res.status(200).json({ data: items });
  } catch (error) {
    return next(new Error(error));
  }
};
