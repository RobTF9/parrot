import { Router } from 'express';
import { parrotActive } from '../../services/auth/auth.middleware';
import { createGame, getMany, getOne, updateOne } from './game.controllers';

const router = Router();

router.use(parrotActive);

router.route('/create').get(createGame);

router.route('/:id').put(updateOne).get(getOne);

router.route('/').get(getMany);

export default router;
