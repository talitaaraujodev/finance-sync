import { Injectable } from '@nestjs/common';
import { UserServiceInputPort } from '../input/UserServiceInputPort';
import { UserPersistence } from '../output/UserPersistenceOutputPort';
import { User } from '../domain/models/User';

@Injectable()
export class UserService implements UserServiceInputPort {
  constructor(private readonly userPersistence: UserPersistence) {}

  async create(user: User): Promise<User> {
    // const existingUser = await this.userPersistence.findByEmail(userDto.email);
    // if (existingUser) {
    //   throw new Error('Usuário já existe');
    // }

    // const userCreated = new User(
    //   user.name,
    //   user.email,
    //   user.password,
    //   user.permissions,
    // );

    // const userSaved = await this.userPersistence.create(userCreated);
    throw new Error('Method not implemented.');
  }
  update(id: string, user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
