import { Router } from 'express';
import { parrotActive } from '../../services/auth/auth.middleware';
import { createTag } from './tag.controller';

const router = Router();

router.use(parrotActive);

router.route('/').post(createTag);

export default router;
