import { Response } from 'express';

import { AuthRequest } from '../../types/Requests';

import User from '../models/User';
import Game from '../models/Game';

class HomeController {
  public async index(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { userId } = req;

      const user = await User.findOne({ _id: userId });
      const games = await Game.find({
        $or: [
          { 'players.user': userId },
        ],
      });

      return res.json({
        user,
        games,
      });
    } catch (err) {
      return res.status(400).json({
        err: 'error',
      });
    }
  }
}

export default new HomeController();
