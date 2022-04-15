import { Router } from 'express';
import { getAllDataByUsers } from './admin.controllers';
import { checkIsAdmin } from './admin.middleware';

const router = Router();

router.use(checkIsAdmin);
router.get('/', getAllDataByUsers);

export default router;
