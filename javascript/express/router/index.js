import { Router } from 'express';
import { getUser, createUser, login } from '../controllers/users.js';
import { validateTokenMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/user/sign-up', createUser);
router.post('/user/login', login);
router.get('/user', validateTokenMiddleware, getUser);

export default router;
