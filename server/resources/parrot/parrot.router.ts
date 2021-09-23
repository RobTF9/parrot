import { Router } from 'express';
import {
  createOne,
  getActive,
  getShared,
  getYours,
  setActive,
  updateOne,
} from './parrot.controllers';

const router = Router();

router.route('/').post(createOne).get(getYours);

router.route('/shared').get(getShared);

router.route('/active').get(getActive);

router.route('/:id').get(setActive).put(updateOne);

export default router;
