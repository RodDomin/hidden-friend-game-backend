import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';
import auth from '../app/middlewares/auth';

const router = Router();

router.route('/')
  .put(auth, SessionController.update)
  .post(SessionController.store);

export default router;
