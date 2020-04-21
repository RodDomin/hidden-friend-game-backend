import { Response } from 'express';

import { AuthRequest } from '../../types/Requests';
import rangeRandom from '../../utils/rangeRandom';

import Game from '../models/Game';
import User from '../models/User';

class GameSortController {
  public async store(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const game = await Game.findOne({
        _id: id,
      }).populate('lead');

      if (!game) {
        return res.status(404).json({
          message: 'game not found',
        });
      }

      const sortedPlayers = game.players.map((player) => player.user);

      game.players.forEach((player, index) => {
        let sortedNumber = rangeRandom({
          min: 0,
          max: sortedPlayers.length,
        });

        while (sortedPlayers.length !== 1 && sortedNumber === 0) {
          sortedNumber = rangeRandom({
            min: 0,
            max: sortedPlayers.length,
          });
        }

        game.players[index].drawn = sortedPlayers[sortedNumber];

        sortedPlayers.splice(sortedNumber, 1);
      });

      game.completed = true;
      await game.save();

      const drawnIndex: number = game?.players.findIndex((player) => {
        if (typeof player.user !== 'string') {
          return player.user._id.toString() === req.userId;
        }
        return false;
      });

      const drawn = game?.players[drawnIndex].drawn;

      const user = await User.findOne({
        _id: drawn,
      });

      game.drawn = user?.email;

      // for (let i = 0; i < game.players.length; i += 1) {
      //   const localUser = await User.findOne({
      //     _id: game.players[i].user as string,
      //   });

      //   if (localUser) {
      //     await MailService.sendMail({
      //       to: localUser.email,
      //       subject: 'CONVITE',
      //       text: `Ei, ${game.lead.name} fez um amigo secreto, da uma olhada no teu resultado`,
      //     });
      //   }
      // }

      return res.json(game);
    } catch (err) {
      return res.status(400).json({
        err,
      });
    }
  }
}

export default new GameSortController();
