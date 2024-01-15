// models/User.ts
import mongoose, { Schema } from 'mongoose';
import { UserDocument, IUser } from '../interfaces/UserInterface';

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    softDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
