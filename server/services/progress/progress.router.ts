import { Router } from 'express';
import { parrotActive } from '../auth/auth.middleware';
import { getGoalProgress } from './progress.controllers';
import { detectStreak } from './progress.middleware';

const router = Router();

router.use(parrotActive);
router.use(detectStreak);
router.route('/').get(getGoalProgress);

export default router;
