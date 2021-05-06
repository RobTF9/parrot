import { Router } from 'express';
import {
  createOne,
  getShared,
  getYours,
  setActive,
  shareLexicon,
} from './lexicon.controllers';

const router = Router();

router.route('/').post(createOne).get(getYours);

router.route('/shared').get(getShared);

router.route('/:id').get(setActive).patch(shareLexicon);

export default router;
