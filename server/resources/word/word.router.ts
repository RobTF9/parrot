import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createWord, getMany, updateOne, getOne } from './word.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').put(updateOne).get(getOne);

router.route('/').post(createWord).get(getMany);

export default router;
