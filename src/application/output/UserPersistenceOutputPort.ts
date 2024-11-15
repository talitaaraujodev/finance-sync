import { User } from '../domain/models/User';

export interface UserPersistence {
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
