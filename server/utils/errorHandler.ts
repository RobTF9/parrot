import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _, res) => {
  if (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } else {
    res.end();
    console.error(res);
  }
};

export default errorHandler;
