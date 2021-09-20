import { Router } from 'express';
import {
  createOne,
  getShared,
  getYours,
  setActive,
  shareParrot,
  unshareParrot,
} from './parrot.controllers';

const router = Router();

router.route('/').post(createOne).get(getYours);

router.route('/shared').get(getShared);

router.route('/:id').get(setActive).put(shareParrot).patch(unshareParrot);

export default router;
