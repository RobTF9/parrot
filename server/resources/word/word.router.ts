import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createOne, getMany } from './word.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/').post(createOne).get(getMany);

export default router;
