import { Router } from 'express';

import HomeController from '../app/controllers/HomeController';
import auth from '../app/middlewares/auth';

const router = Router();

router.route('/')
  .get(auth, HomeController.index);

export default router;
