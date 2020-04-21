import { Router } from 'express';

import UserRouter from './user.routes';
import GameRouter from './game.routes';
import SessionRouter from './session.routes';

import HomeRouter from './home.routes';

const router = Router();

router.use('/users', UserRouter);
router.use('/games', GameRouter);
router.use('/session', SessionRouter);
router.use('/home', HomeRouter);

export default router;
