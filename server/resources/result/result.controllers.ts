import { RequestHandler } from 'express';
import { Schema } from 'mongoose';
import {
  ERROR_MESSAGE,
  GAME_ORDER,
  SUCCESS_MESSAGE,
} from '../../utils/constants';
import shuffle from '../../utils/shuffle';
import Game from '../game/game.model';
import Result from './result.model';
import { createNotification } from '../notification/notification.controllers';

export const updateResult: RequestHandler = async (req, res, next) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: undefined,
      },
      { new: true }
    )
      .populate({ path: 'game' })
      .populate({ path: 'items', populate: { path: 'item' } })
      .exec();

    if (!result) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    if (
      result.items.filter(({ correct, skipped }) => correct || skipped)
        .length === result.score.total
    ) {
      result.finished = true;
      await result.save();

      if (`${req.session.user}` !== `${result.game.createdBy}`) {
        createNotification(
          new Schema.Types.ObjectId(result.game.createdBy),
          req.session.user,
          `/games/${result.game._id}`,
          `The game "${result.game.name}" was updated`
        );
      }
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    return next(new Error(error));
  }
};

export const newResult: RequestHandler = async (req, res, next) => {
  try {
    const game = await Game.findById(req.body.game).lean().exec();

    if (!game) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    const items = game.items.map((item) => ({
      item,
      correct: false,
      skipped: false,
      attempts: false,
    }));

    let result = await Result.create({
      game: game._id,
      lexicon: req.session.lexicon?._id,
      createdBy: req.session.user,
      score: {
        correct: [],
        total: game.items.length,
      },
      finished: false,
      items: game.order === GAME_ORDER.RANDOM ? shuffle(items) : items,
    });

    result = await result
      .populate({ path: 'game' })
      .populate({ path: 'items', populate: { path: 'item' } })
      .execPopulate();

    await Game.findByIdAndUpdate(req.body.game, {
      $push: { results: result._id },
    });

    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGE.GAME_STARTED, data: result });
  } catch (error) {
    return next(new Error(error));
  }
};

export const getResult: RequestHandler = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate({ path: 'game' })
      .populate({ path: 'items', populate: { path: 'item' } })
      .exec();

    if (!result) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    return next(new Error(error));
  }
};
