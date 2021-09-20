import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createPhrase, getMany, updateOne, getOne } from './phrase.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').put(updateOne).get(getOne);

router.route('/').post(createPhrase).get(getMany);

export default router;
