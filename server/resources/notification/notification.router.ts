import { Router } from 'express';
import { getNotifications } from './notification.controllers';

const router = Router();

router.route('/').get(getNotifications);

export default router;
