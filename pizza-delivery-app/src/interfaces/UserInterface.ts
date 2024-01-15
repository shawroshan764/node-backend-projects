
import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
  createdAt: Date;
  softDelete: boolean;
}

export interface UserDocument extends Document, IUser {
  
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  mobile: string;
}
