import { model, Schema, Document } from 'mongoose';

export interface UserAttributes extends Document {
  name: string;
  lastName: string;
  email: string;
  picture: {
    name: string;
    originalName: string;
  };
}

const UserSchema = new Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    trim: true,
  },
  picture: {
    name: String,
    originalName: String,
  },
}, {
  timestamps: true,
});

UserSchema.methods.fullName = function (): string {
  return `${this.name} ${this.lastName}`;
};

export default model<UserAttributes>('users', UserSchema);
