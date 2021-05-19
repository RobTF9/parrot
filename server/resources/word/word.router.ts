import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createOne, getMany, updateOne } from './word.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').put(updateOne);

router.route('/').post(createOne).get(getMany);

export default router;
