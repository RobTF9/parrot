import { Router } from 'express';
import { deleteUser, getUser, updateUser } from './user.controllers';

const router = Router();

router.route('/').get(getUser).put(updateUser).delete(deleteUser);

export default router;
