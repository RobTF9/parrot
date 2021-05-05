import { Router } from 'express';
import { getUser, updateUser } from './user.controllers';

const router = Router();

router.route('/').get(getUser).put(updateUser);

export default router;
