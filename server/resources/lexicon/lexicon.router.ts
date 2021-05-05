import { Router } from 'express';
import { createOne, getYours, setActive } from './lexicon.controllers';

const router = Router();

router.route('/').post(createOne).get(getYours);

router.route('/:id').put(setActive);

export default router;
