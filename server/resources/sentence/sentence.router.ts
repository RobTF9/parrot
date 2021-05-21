import { Router } from 'express';
import { lexiconActive } from '../../services/auth/auth.middleware';
import { createSentence } from './sentence.controllers';

const router = Router();

router.use(lexiconActive);

router.route('/').post(createSentence);

export default router;
