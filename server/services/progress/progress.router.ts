import { Router } from 'express';
import { lexiconActive } from '../auth/auth.middleware';
import { getGoalProgress } from './progress.controllers';

const router = Router();

router.use(lexiconActive);
router.route('/').get(getGoalProgress);

export default router;
