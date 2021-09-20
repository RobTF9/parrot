import { RequestHandler } from 'express';
import Lexicon from '../../resources/lexicon/lexicon.model';
import { ERROR_MESSAGE } from '../../utils/constants';
import Item from '../../resources/item/item.model';
import Result from '../../resources/result/result.model';

export const getGoalProgress: RequestHandler = async (req, res, next) => {
  try {
    const lexicon = await Lexicon.findById(req.session.lexicon?._id)
      .lean()
      .exec();

    if (!lexicon) {
      return res.status(400).json(ERROR_MESSAGE.NO_LEXICON_ACTIVE);
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const phraseGoal = lexicon?.goals.words;
    const phrasesAddedToday = await Item.find({ createdAt: { $gte: today } });

    const gameGoal = lexicon?.goals.games;
    const gamesFinishedToday = await Result.find({
      createdAt: { $gte: today },
      finished: true,
    });

    return res.status(200).json({
      data: {
        phrases: {
          goal: phraseGoal,
          added: phrasesAddedToday.length,
        },
        games: {
          goal: gameGoal,
          finished: gamesFinishedToday.length,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};
