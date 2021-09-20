import { Router } from 'express';
import { parrotActive } from '../../services/auth/auth.middleware';
import { updateResult, getResult, newResult } from './result.controllers';

const router = Router();

router.use(parrotActive);
router.route('/new').post(newResult);
router.route('/:id').put(updateResult).get(getResult);

export default router;
