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

export const getResult: RequestHandler = async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).lean().exec();

    if (!game) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }

    const result = await Result.findOne({
      game: game._id,
      finished: false,
      createdBy: req.session.user,
    })
      .populate({ path: 'game' })
      .populate({ path: 'items', populate: { path: 'item' } })
      .exec();

    if (result) {
      return res
        .status(200)
        .json({ message: SUCCESS_MESSAGE.GAME_RELOADED, data: result });
    }

    let newResult = await Result.create({
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

    newResult = await newResult
      .populate({ path: 'game' })
      .populate({ path: 'items', populate: { path: 'item' } })
      .execPopulate();

    await Game.findByIdAndUpdate(req.params.id, {
      $push: { results: newResult._id },
    });

    return res
      .status(201)
      .json({ message: SUCCESS_MESSAGE.GAME_STARTED, data: newResult });
  } catch (error) {
    return next(new Error(error));
  }
};
