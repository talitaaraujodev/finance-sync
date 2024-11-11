import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPersistence } from 'src/application/output/UserPersistenceOutputPort';
import {
  UserSchema,
  UserDocument as User,
} from '../../persistence/entities/UserEntity';

@Injectable()
export class UserPersistenceAdapter implements UserPersistence {
  constructor(
    @InjectModel(UserSchema.name)
    private userRepository: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository
      .findById({ email })
      .populate('permissions', 'name _id')
      .exec();

    return {
      name: user.name,
      email: user.email,
      password: user.password,
      permissions: user.permissions.map((role: any) => ({
        _id: role._id,
        name: role.name,
      })),
    } as unknown as User;
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userRepository(user);
    return await createdUser.save();
  }

  async update(id: string, user: User): Promise<void> {
    await this.userRepository.findByIdAndUpdate(id, user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository
      .find()
      .populate('permissions', 'name _id')
      .exec();

    return users.map((user) => ({
      name: user.name,
      email: user.email,
      password: user.password,
      permissions: user.permissions.map((role: any) => ({
        _id: role._id,
        name: role.name,
      })),
    })) as unknown as User[];
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository
      .findById(id)
      .populate('permissions', 'name _id')
      .exec();

    return {
      name: user.name,
      email: user.email,
      password: user.password,
      permissions: user.permissions.map((role: any) => ({
        _id: role._id,
        name: role.name,
      })),
    } as unknown as User;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.findByIdAndDelete(id);
  }
}
