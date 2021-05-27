import { Router } from 'express';
import { getItems } from './item.controllers';
import { lexiconActive } from '../../services/auth/auth.middleware';

const router = Router();

router.use(lexiconActive);

router.route('/').get(getItems);

export default router;
