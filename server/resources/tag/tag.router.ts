import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { getMany, createOne } from './tag.controllers';

const router = Router();

router.use(lexiconActive);
router.route('/').get(getMany).post(createOne);

export default router;
