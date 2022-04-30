import { Router } from 'express';
import { parrotActive } from '../../services/auth/auth.middleware';
import { createTag, tagPhrase, updateTag } from './tag.controller';

const router = Router();

router.use(parrotActive);

router.route('/').post(createTag).patch(tagPhrase);

router.route('/:id').put(updateTag);

export default router;
