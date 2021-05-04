import { Router } from 'express';

const router = Router();

router.get('/', async (_, res, next) => {
  try {
    res.send({
      message: 'User',
    });
  } catch (error) {
    next(new Error(error));
  }
});

export default router;
