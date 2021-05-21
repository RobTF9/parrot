import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import {
  createSentence,
  getMany,
  getOne,
  updateOne,
} from './sentence.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/:id').put(updateOne).get(getOne);

router.route('/').post(createSentence).get(getMany);

export default router;
