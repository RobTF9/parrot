import { RequestHandler } from 'express';
import Game, { List, Conversation } from './game.model';
import {
  ERROR_MESSAGE,
  GAME_TYPE,
  SUCCESS_MESSAGE,
} from '../../utils/constants';
import { createNotification } from '../notification/notification.controllers';

export const createGame: RequestHandler = async (req, res, next) => {
  try {
    let game;
    if (req.body.mode === GAME_TYPE.CONVERSATION) {
      game = await Conversation.create({
        ...req.body,
        createdBy: req.session.user,
        updatedBy: req.session.user,
        lexicon: req.session.lexicon?._id,
      });
    } else if (
      req.body.mode === GAME_TYPE.GRID ||
      req.body.mode === GAME_TYPE.SEQUENCE
    ) {
      game = await List.create({
        ...req.body,
        createdBy: req.session.user,
        updatedBy: req.session.user,
        lexicon: req.session.lexicon?._id,
      });
    } else {
      return res.status(400).send({ message: ERROR_MESSAGE.INVALID_MODE });
    }

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
      .populate('sentences words')
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
