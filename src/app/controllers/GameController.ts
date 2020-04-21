import { Response, Request } from 'express';
import { Types } from 'mongoose';

import { AuthRequest } from '../../types/Requests';

import Game from '../models/Game';
import User, { UserAttributes } from '../models/User';

import calculatePagination from '../../utils/calculatePagination';

class GameController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { page } = req.query;

      const game = await Game
        .find()
        .limit(10)
        .skip(
          calculatePagination({
            page: Number(page),
            limit: 10,
          }),
        );

      return res.json(game);
    } catch (err) {
      return res.status(400).json({
        message: 'error',
      });
    }
  }

  public async show(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const game: any = await Game.findOne({
        _id: id,
      }).populate('players.user lead players.drawn');

      if (game?.completed) {
        const userIndex: number = game?.players.findIndex((player: any) => {
          if (typeof player.user !== 'string') {
            return player.user._id.toString() === req.userId;
          }
          return false;
        });

        const drawn = game?.players[userIndex].drawn.email;

        game.drawn = drawn;
      }

      return res.json(game);
    } catch (err) {
      return res.status(400).json({
        message: 'error',
        err,
      });
    }
  }

  public async store(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const { users, lead, title } = req.body;

      users.splice(7, Number.MAX_VALUE);

      const user = await User.findById(req.userId) as UserAttributes;

      const data = await Promise.all<{
        user: string | Types.ObjectId;
        accepted: boolean;
      }>(users.map(async (email: string) => {
        let localUser = await User.findOne({
          email,
        });

        if (!localUser) {
          localUser = await User.create({
            email,
          });
        }

        return {
          user: localUser._id,
          accepted: false,
        };
      }));

      data.push({
        user: user._id,
        accepted: true,
      });


      const game = await Game.create({
        players: data,
        lead: lead || user._id,
        title,
      });

      return res.json(game);
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        message: 'error',
        err,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updatedGame = await Game.findOneAndUpdate({
        _id: id,
      }, req.body, {
        new: true,
      });

      return res.json(updatedGame);
    } catch (err) {
      return res.status(400).json({
        message: 'error',
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await Game.findByIdAndDelete({
        _id: id,
      });

      return res.status(204).json();
    } catch (err) {
      return res.status(400).json({
        message: 'error',
      });
    }
  }
}

export default new GameController();
