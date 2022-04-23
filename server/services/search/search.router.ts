import { Router } from 'express';
import { getSearchResultsByQuery } from './search.controllers';

const router = Router();
router.route('/').get(getSearchResultsByQuery);

export default router;
