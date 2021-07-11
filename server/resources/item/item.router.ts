import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createItem, getMany, updateOne, getOne } from './item.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').put(updateOne).get(getOne);

router.route('/').post(createItem).get(getMany);

export default router;
