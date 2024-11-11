import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePersistence } from 'src/application/output/RolePersistenceOutputPort';
import {
  RoleSchema,
  RoleDocument as Role,
} from '../../persistence/entities/RoleEntity';

@Injectable()
export class RolePersistenceAdapter implements RolePersistence {
  constructor(
    @InjectModel(RoleSchema.name)
    private roleRepository: Model<Role>,
  ) {}

  async create(role: Role): Promise<Role> {
    const createdRole = new this.roleRepository(role);
    return await createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find().exec();
  }

  async findOne(id: string): Promise<Role> {
    return await this.roleRepository.findById(id).exec();
  }
  async findByName(name: string): Promise<Role> {
    return await this.roleRepository.findOne({ name: name }).exec();
  }
}
