import { Router } from 'express';
import { getRead, getUnread, markAsRead } from './notification.controllers';

const router = Router();

router.route('/').get(getUnread).put(markAsRead);

router.route('/read').get(getRead);

export default router;
