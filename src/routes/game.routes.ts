import { Router } from 'express';

import GameController from '../app/controllers/GameController';
import GameSortController from '../app/controllers/GameSortController';

import auth from '../app/middlewares/auth';

const router = Router();

router.route('/')
  .get(GameController.index)
  .post(auth, GameController.store);

router.route('/:id')
  .get(auth, GameController.show)
  .put(auth, GameController.update)
  .delete(auth, GameController.delete);

router.route('/:id/sort')
  .post(auth, GameSortController.store);

export default router;
