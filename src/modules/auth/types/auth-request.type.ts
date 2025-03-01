import { User } from '../../users/user.entity';
import { Request as ExpressRequest } from 'express';

export interface AuthRequestType extends ExpressRequest {
  user: User;
}
