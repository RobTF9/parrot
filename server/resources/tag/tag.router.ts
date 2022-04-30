import { Router } from 'express';
import { parrotActive } from '../../services/auth/auth.middleware';
import { createTag, updateTag } from './tag.controller';

const router = Router();

router.use(parrotActive);

router.route('/').post(createTag);

router.route('/:id').put(updateTag);

export default router;
