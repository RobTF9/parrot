import { RequestHandler } from 'express';
import Phrase, { PhraseDocument } from '../../resources/phrase/phrase.model';

export const getSearchResultsByQuery: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const data: { phrases?: PhraseDocument[] } = {};

    if (req.query.phrase) {
      const regex = new RegExp(`${req.query.phrase}`, 'i');
      const phrases = await Phrase.find({
        $or: [
          { lang: { $regex: regex } },
          { pron: { $regex: regex } },
          { tran: { $regex: regex } },
        ],
      });
      data.phrases = phrases;
    }

    if (!data.phrases) {
      return res.status(404).json({ data });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return next(error);
  }
};
