import {
  model, Schema, Types, Document,
} from 'mongoose';

import { UserAttributes } from './User';

interface GameAttributes extends Document {
  players: [
    {
      user: UserAttributes | string;
      accepted: boolean;
      drawn?: UserAttributes | string;
    }
  ];
  completed: boolean;
  lead: UserAttributes;
  title: string;
  drawn?: string;
}

const GameSchema = new Schema({
  players: [
    {
      user: {
        type: Types.ObjectId,
        ref: 'users',
      },
      accepted: {
        type: Boolean,
        default: false,
      },
      drawn: {
        type: Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  lead: {
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  },
  title: String,
  drawn: String,
});

export default model<GameAttributes>('games', GameSchema);
