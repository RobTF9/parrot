import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { getResult } from './result.controllers';

const router = Router();

router.use(lexiconActive);
router.route('/:id').get(getResult);

export default router;
