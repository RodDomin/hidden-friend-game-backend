import { Response, Request } from 'express';
import * as Yup from 'yup';

import User from '../models/User';

import calculatePagination from '../../utils/calculatePagination';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { page } = req.query;

      const users = await User
        .find()
        .limit(10)
        .skip(
          calculatePagination({
            page: Number(page),
            limit: 10,
          }),
        );

      return res.json(users);
    } catch (err) {
      return res.status(400).json({
        message: 'error',
      });
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        _id: id,
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({
        message: 'error',
      });
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
      });

      if (!await schema.isValid(req.body)) {
        return res
          .status(401)
          .json({
            message: 'validation fail',
            fieldsRequired: [
              'email',
            ],
          });
      }

      const { name, lastName, email } = req.body;

      const user = await User.create({
        name,
        lastName,
        email,
      });

      return res.json(user);
    } catch (err) {
      return res.status(400).json({
        message: 'error',
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const updatedUser = await User.findOneAndUpdate({
        _id: id,
      }, req.body, {
        new: true,
      });

      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({
        message: 'error',
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await User.deleteOne({
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

export default new UserController();
