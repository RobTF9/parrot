import { Router } from 'express';
import {
  signIn,
  signUp,
  signOut,
  checkAuth,
  requestPasswordReset,
  passwordReset,
} from './auth.controllers';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/', checkAuth);
router.get('/signout', signOut);
router.post('/forgot', requestPasswordReset);
router.post('/reset', passwordReset);

export default router;
