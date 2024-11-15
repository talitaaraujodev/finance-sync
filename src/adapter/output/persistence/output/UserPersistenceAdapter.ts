import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserPersistence } from 'src/application/output/UserPersistenceOutputPort';
import { User } from 'src/application/domain/models/User';
import { Role } from 'src/application/domain/aggregates/Role';
import { UserEntity, UserDocument } from '../entities/UserEntity';

@Injectable()
export class UserPersistenceAdapter implements UserPersistence {
  constructor(
    @InjectModel(UserEntity.name)
    private userRepository: Model<UserEntity>,
  ) {}

  private prepareDocument(user: User): Partial<UserDocument> {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      permissions: user.roles.map((role) => new Types.ObjectId(role.id)),
    };
  }

  async findByEmail(email: string): Promise<User> {
    const userDocument = await this.userRepository
      .findOne({ email })
      .populate('permissions', 'name _id')
      .exec();

    if (!userDocument) return null;
    return new User(
      userDocument.name,
      userDocument.email,
      userDocument.password,
      userDocument.permissions.map((permission: any) => {
        return new Role(permission._id, permission.name);
      }),
    );
  }

  async create(user: User): Promise<User> {
    const documentData = this.prepareDocument(user);
    const createdUser = new this.userRepository(documentData);
    const savedUser = await createdUser.save();
    const userData = await savedUser.populate('permissions', 'name _id');

    return new User(
      userData.name,
      userData.email,
      userData.password,
      userData.permissions.map((permission: any) => {
        return new Role(permission._id, permission.name);
      }),
    );
  }

  async update(id: string, user: User): Promise<void> {
    const documentData = this.prepareDocument(user);
    await this.userRepository.findByIdAndUpdate(id, documentData);
  }

  async findAll(): Promise<User[]> {
    const userDocuments = await this.userRepository
      .find()
      .populate('permissions', 'name _id')
      .exec();

    return userDocuments.map((doc) => {
      return new User(
        doc.name,
        doc.email,
        doc.password,
        doc.permissions.map((permission: any) => {
          return new Role(permission._id, permission.name);
        }),
      );
    });
  }

  async findOne(id: string): Promise<User> {
    const userDocument = await this.userRepository
      .findById(id)
      .populate('permissions', 'name _id')
      .exec();

    if (!userDocument) return null;
    return new User(
      userDocument.name,
      userDocument.email,
      userDocument.password,
      userDocument.permissions.map((permission: any) => {
        return new Role(permission._id, permission.name);
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.findByIdAndDelete(id);
  }
}
