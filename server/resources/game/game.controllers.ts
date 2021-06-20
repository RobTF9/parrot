import { RequestHandler } from 'express';
import Game from './game.model';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import { createNotification } from '../notification/notification.controllers';

export const createGame: RequestHandler = async (req, res, next) => {
  try {
    const game = await Game.create({
      ...req.body,
      createdBy: req.session.user,
      updatedBy: req.session.user,
      lexicon: req.session.lexicon?._id,
    });
    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGE.GAME_CREATED, data: game });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const games = await Game.find({
      lexicon: req.session.lexicon?._id,
    })
      .lean()
      .exec();

    return res.status(200).json({ data: games });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate({ path: 'items', populate: { path: 'item' } })
      .populate({
        path: 'results',
        populate: { path: 'items', populate: { path: 'item' } },
      })
      .lean()
      .exec();

    if (!game) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res.status(200).send({ data: game });
  } catch (error) {
    return next(new Error(error));
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

    if (`${req.session.user}` !== `${game.createdBy}`) {
      createNotification(
        game.createdBy,
        req.session.user,
        `/games/${game._id}`,
        `The game "${game.name}" was updated`
      );
    }

    return res
      .status(200)
      .json({ data: game, message: SUCCESS_MESSAGE.GAME_UPDATED });
  } catch (error) {
    return next(new Error(error));
  }
};
