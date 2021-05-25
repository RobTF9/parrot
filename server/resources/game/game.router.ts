import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createGame, getMany, getOne, updateOne } from './game.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').get(getOne).put(updateOne);

router.route('/').post(createGame).get(getMany);

export default router;
