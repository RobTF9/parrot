import { Router } from 'express';
import { parrotActive } from '../../services/auth/auth.middleware';
import { createGame, getMany, getOne, updateOne } from './game.controllers';

const router = Router();

router.use(parrotActive);

router.route('/:id').get(getOne).put(updateOne);

router.route('/').post(createGame).get(getMany);

export default router;
