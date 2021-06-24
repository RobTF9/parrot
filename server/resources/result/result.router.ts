import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { updateResult, getResult, newResult } from './result.controllers';

const router = Router();

router.use(lexiconActive);
router.route('/new/:id').get(newResult);
router.route('/:id').put(updateResult).get(getResult);

export default router;
