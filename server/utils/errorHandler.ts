import { ErrorRequestHandler } from 'express';
import { ERROR_MESSAGE } from './constants';

const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  console.log('ERROR: ');
  console.log(err);
  console.log('REQUEST: ', req.body, req.session);
  console.log('NEXT: ', _);

  if (err) {
    if (err.code && err.code === 11000) {
      return res.status(400).json({ message: ERROR_MESSAGE.DUPLICATE_GENERIC });
    }

    res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER });
    throw new Error(err);
  }
  return res.end();
};

export default errorHandler;
