import { Response } from 'express';
import jwt from 'jsonwebtoken';

import jwtConfig from '../../config/jwtConfig';

import { AuthRequest } from '../../types/Requests';
import User from '../models/User';

class SessionController {
  public async store(req: AuthRequest, res: Response) {
    try {
      const { email } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(404).json({
          message: 'user not found',
        });
      }

      const token = jwt.sign(
        { id: user._id },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn },
      );

      return res.json({
        user,
        token,
      });
    } catch (err) {
      return res.status(400).json({
        err: 'err',
      });
    }
  }

  public async update(req: AuthRequest, res: Response) {
    try {
      const { userId } = req;

      const user = await User.findOne({
        _id: userId,
      });

      if (!user) {
        return res.status(404).json({
          message: 'user not found',
        });
      }

      const token = jwt.sign(
        { id: user._id },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn },
      );

      return res.json({
        user,
        token,
      });
    } catch (err) {
      return res.status(400).json({
        err: 'err',
      });
    }
  }
}

export default new SessionController();
