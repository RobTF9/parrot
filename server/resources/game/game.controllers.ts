import { RequestHandler } from 'express';
import Game from './game.model';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import Phrase from '../phrase/phrase.model';
import Parrot from '../parrot/parrot.model';

export const createGame: RequestHandler = async (req, res, next) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const gamePhrases = await Phrase.find({ createdAt: { $gte: today } });
    const parrot = await Parrot.findById(req.session.parrot?._id);

    if (parrot && parrot.goals && gamePhrases.length < parrot.goals.phrase) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGE.PHRASE_GOAL_NOT_REACHED });
    }

    const existingGames = await Game.find({ createdAt: { $gte: today } })
      .populate('phrases')
      .lean()
      .exec();
    let gameExists;

    existingGames.forEach((game) => {
      if (game.phrases.length === gamePhrases.length) {
        gameExists = game;
      }
    });

    if (gameExists) {
      console.log(gameExists);
      return res
        .status(200)
        .json({ message: SUCCESS_MESSAGE.GAME_RELOADED, data: gameExists });
    }

    const game = await Game.create({
      phrases: gamePhrases,
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
      .populate('phrases')
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
      .populate('phrases')
      .lean()
      .exec();

    if (!game || `${game.createdBy}` !== `${req.session.user}`) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res.status(200).json({ data: game });
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
