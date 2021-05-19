import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createWords, getMany, updateOne } from './word.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').put(updateOne);

router.route('/').post(createWords).get(getMany);

export default router;
