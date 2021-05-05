import { Router } from 'express';
import { signIn, signUp, signOut, checkAuth } from './auth.controllers';

const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/', checkAuth);
router.get('/signout', signOut);

export default router;
