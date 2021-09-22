import { RequestHandler } from 'express';
import Parrot from '../../resources/parrot/parrot.model';
import { ERROR_MESSAGE } from '../../utils/constants';
import Phrase from '../../resources/phrase/phrase.model';
import Game from '../../resources/game/game.model';

export const getGoalProgress: RequestHandler = async (req, res, next) => {
  try {
    const parrot = await Parrot.findById(req.session.parrot?._id).lean().exec();

    if (!parrot) {
      return res.status(400).json(ERROR_MESSAGE.NO_LEXICON_ACTIVE);
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const phraseGoal = parrot?.goals.phrase;
    const phrasesAddedToday = await Phrase.find({ createdAt: { $gte: today } });

    const gameGoal = parrot?.goals.games;
    const gamesCreatedToday = await Game.find({
      createdAt: { $gte: today },
    });

    let gamesCompletedToday = 0;

    gamesCreatedToday.forEach((game) => {
      gamesCompletedToday += game.results.filter((result) => result.played)
        .length;
    });

    return res.status(200).json({
      data: {
        phrase: {
          goal: phraseGoal,
          added: phrasesAddedToday.length,
        },
        games: {
          goal: gameGoal,
          finished: gamesCompletedToday,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};