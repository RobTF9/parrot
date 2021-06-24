import { RequestHandler } from 'express';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../utils/constants';
import Game from '../game/game.model';
import Result from './result.model';

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

    return res.status(200).json({ data: result });
  } catch (error) {
    return next(new Error(error));
  }
};

export const newResult: RequestHandler = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).lean().exec();

    if (!game) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    let result = await Result.create({
      game: game._id,
      lexicon: req.session.lexicon?._id,
      createdBy: req.session.user,
      score: {
        correct: [],
        total: game.items.length,
      },
      finished: false,
      items: game.items.map((item) => ({
        item,
        correct: false,
        skipped: false,
        attempts: false,
      })),
    });

    result = await result
      .populate({ path: 'game' })
      .populate({ path: 'items', populate: { path: 'item' } })
      .execPopulate();

    await Game.findByIdAndUpdate(req.params.id, {
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
