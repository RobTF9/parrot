import { RequestHandler } from 'express';

export const getUser: RequestHandler = async (_, res, next) => {
  try {
    res.send({
      message: 'User',
    });
  } catch (error) {
    next(new Error(error));
  }
};

export const updateUser: RequestHandler = async (_, res, next) => {
  try {
    res.send({
      message: 'User',
    });
  } catch (error) {
    next(new Error(error));
  }
};
