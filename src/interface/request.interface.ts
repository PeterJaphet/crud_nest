import { Request } from 'express';
import { User } from '../typeorm/entities/User';

export interface CustomRequest extends Request {
  user?: User;
}
