import { RequestHandler } from 'express';
import Parrot from '../../resources/parrot/parrot.model';
import Phrase from '../../resources/phrase/phrase.model';
import Game from '../../resources/game/game.model';

export const detectStreak: RequestHandler = async (req, _, next) => {
  try {
    // get parrot and goals
    const parrot = await Parrot.findById(req.session.parrot?._id).lean().exec();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );

    // get phrases and games created today
    const phrasesAddedToday = await Phrase.find({
      createdAt: { $gte: today },
      createdBy: req.session.user,
      parrot: req.session.parrot?._id,
    });

    const gamesCreatedToday = await Game.find({
      createdAt: { $gte: today },
      createdBy: req.session.user,
      parrot: req.session.parrot?._id,
    });

    let gamesCompletedToday = 0;

    gamesCreatedToday.forEach((game) => {
      gamesCompletedToday += game.results.filter((result) => result.played)
        .length;
    });

    // check if goal has matched
    if (
      parrot &&
      phrasesAddedToday.length >= parrot?.goals.phrase &&
      gamesCompletedToday >= parrot?.goals.games
    ) {
      if (!parrot.streak) {
        await Parrot.findByIdAndUpdate(req.session.parrot?._id, {
          streak: {
            date: today.toISOString(),
            number: 1,
          },
        });
      } else if (parrot.streak.date === yesterday.toISOString()) {
        await Parrot.findByIdAndUpdate(req.session.parrot?._id, {
          streak: {
            date: today.toISOString(),
            number: parrot.streak.number + 1,
          },
        });
      } else if (parrot.streak.date === today.toISOString()) {
        return next();
      } else {
        await Parrot.findByIdAndUpdate(req.session.parrot?._id, {
          streak: {
            date: today.toISOString(),
            number: 1,
          },
        });
      }
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
