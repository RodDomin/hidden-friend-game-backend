import { Router } from 'express';

import UserController from '../app/controllers/UserController';

const router = Router();

router.route('/')
  .get(UserController.index)
  .post(UserController.store);

router.route('/:id')
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.delete);

export default router;
