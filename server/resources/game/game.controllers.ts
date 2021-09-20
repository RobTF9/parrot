import { RequestHandler } from 'express';
import Game from './game.model';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import Result from '../result/result.model';
import Phrase from '../phrase/phrase.model';
import shuffle from '../../utils/shuffle';

export const createGame: RequestHandler = async (req, res, next) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const gamePhrases = await Phrase.find({ createdAt: { $gte: today } });

    const game = await Game.create({
      phrases: shuffle(gamePhrases),
      createdBy: req.session.user,
      updatedBy: req.session.user,
      parrot: req.session.parrot?._id,
    });

    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGE.GAME_CREATED, data: game });
  } catch (error) {
    return next(error);
  }
};

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const games = await Game.find({
      parrot: req.session.parrot?._id,
    })
      .lean()
      .exec();

    return res.status(200).json({ data: games });
  } catch (error) {
    return next(error);
  }
};

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate({ path: 'phrases', populate: { path: 'phrase' } })
      .lean()
      .exec();

    if (!game) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    const results = await Result.find({
      createdBy: req.session.user,
      game: game._id,
    })
      .lean()
      .exec();

    return res.status(200).send({ data: { ...game, results } });
  } catch (error) {
    return next(error);
  }
};

export const updateOne: RequestHandler = async (req, res, next) => {
  try {
    const game = await Game.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, updatedAt: undefined, updatedBy: req.session.user },
      { new: true }
    );

    if (!game) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res
      .status(200)
      .json({ data: game, message: SUCCESS_MESSAGE.GAME_UPDATED });
  } catch (error) {
    return next(error);
  }
};
