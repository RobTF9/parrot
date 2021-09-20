import { Router } from 'express';
import { parrotActive } from '../auth/auth.middleware';
import { getGoalProgress } from './progress.controllers';

const router = Router();

router.use(parrotActive);
router.route('/').get(getGoalProgress);

export default router;
