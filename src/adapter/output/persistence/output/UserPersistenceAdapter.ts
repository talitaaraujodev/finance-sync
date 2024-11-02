import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPersistence } from 'src/application/output/UserPersistenceOutputPort';
import {
  UserSchema,
  UserDocument,
} from '../../persistence/entities/UserEntity';

@Injectable()
export class UserPersistenceAdapter implements UserPersistence {
  constructor(
    @InjectModel(UserSchema.name)
    private userRepository: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserSchema> {
    return await this.userRepository.findOne({ email: email }).exec();
  }

  async create(user: UserSchema): Promise<UserSchema> {
    const createdUser = new this.userRepository(user);
    return await createdUser.save();
  }

  async update(id: string, user: UserSchema): Promise<void> {
    await this.userRepository.findByIdAndUpdate(id, user);
  }

  async findAll(): Promise<UserSchema[]> {
    return await this.userRepository.find().exec();
  }

  async findOne(id: string): Promise<UserSchema> {
    return await this.userRepository.findById(id).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.findByIdAndDelete(id);
  }
}
