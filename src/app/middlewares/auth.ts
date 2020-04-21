import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { UserAttributes } from '../models/User';
import jwtConfig from '../../config/jwtConfig';
import { AuthRequest } from '../../types/Requests';

const auth = async (
  req: AuthRequest, res: Response, next: NextFunction,
): Promise<void | Response> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'token is not provided',
      });
    }

    const [, token] = authorization.split(' ');

    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret) as UserAttributes;

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'token is not valid',
    });
  }
};

export default auth;
