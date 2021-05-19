import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createWords, getMany, updateOne, getOne } from './word.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').put(updateOne).get(getOne);

router.route('/').post(createWords).get(getMany);

export default router;
