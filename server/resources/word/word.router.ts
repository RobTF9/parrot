import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import {
  createWord,
  getMany,
  updateOne,
  getOne,
  createMultiple,
} from './word.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/multi').post(createMultiple);

router.route('/:id').put(updateOne).get(getOne);

router.route('/').post(createWord).get(getMany);

export default router;
