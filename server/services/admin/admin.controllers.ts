import { RequestHandler } from 'express';
import Game from '../../resources/game/game.model';
import Parrot from '../../resources/parrot/parrot.model';
import Phrase from '../../resources/phrase/phrase.model';
import User from '../../resources/user/user.model';

export const getAllDataByUsers: RequestHandler = async (_, res, next) => {
  try {
    const Users = await User.find();
    const Parrots = await Parrot.find();
    const Phrases = await Phrase.find();
    const Games = await Game.find();

    return res.status(200).json({
      data: {
        users: Users.map((u) => u.getPublicFields()),
        parrots: Parrots,
        phrases: Phrases,
        games: Games,
      },
      admin: true,
    });
  } catch (error) {
    return next(error);
  }
};
