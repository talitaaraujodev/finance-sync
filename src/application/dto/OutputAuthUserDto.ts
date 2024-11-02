import { User } from '../domain/models/User';

export interface OutputAuthUserDto {
  token: string;
  user: User;
}
