import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserServiceInputPort } from '../input/UserServiceInputPort';
import { UserPersistence } from '../output/UserPersistenceOutputPort';
import { User } from '../domain/models/User';

@Injectable()
export class UserService implements UserServiceInputPort {
  constructor(
    @Inject('UserPersistence')
    private readonly userPersistence: UserPersistence,
  ) {}

  async create(user: User): Promise<User> {
    const existingUser = await this.userPersistence.findByEmail(user.email);
    if (existingUser) {
      throw new HttpException(
        'Esse e-mail já está cadastrado no sistema',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userCreated = new User(
      user.name,
      user.email,
      user.password,
      user.roles,
    );

    return await this.userPersistence.create(userCreated);
  }
  async findOne(id: string): Promise<User> {
    const user = await this.userPersistence.findOne(id);
    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async update(id: string, user: User): Promise<void> {
    await this.findOne(id);
    return await this.userPersistence.update(
      id,
      new User(user.id, user.name, user.password, user.roles),
    );
  }
  async findAll(): Promise<User[]> {
    return await this.userPersistence.findAll();
  }
}
