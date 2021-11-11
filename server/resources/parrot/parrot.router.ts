import { Router } from 'express';
import {
  createOne,
  deleteOne,
  getActive,
  getYours,
  setActive,
  updateOne,
} from './parrot.controllers';

const router = Router();

router.route('/').post(createOne).get(getYours);

router.route('/active').get(getActive);

router.route('/:id').get(setActive).put(updateOne).delete(deleteOne);

export default router;
