import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePersistence } from 'src/application/output/RolePersistenceOutputPort';
import {
  RoleSchema,
  RoleDocument,
} from '../../persistence/entities/RoleEntity';

@Injectable()
export class RolePersistenceAdapter implements RolePersistence {
  constructor(
    @InjectModel(RoleSchema.name)
    private roleRepository: Model<RoleDocument>,
  ) {}

  async create(role: RoleSchema): Promise<RoleSchema> {
    const createdRole = new this.roleRepository(role);
    return await createdRole.save();
  }

  async findAll(): Promise<RoleSchema[]> {
    return await this.roleRepository.find().exec();
  }

  async findOne(id: string): Promise<RoleSchema> {
    return await this.roleRepository.findById(id).exec();
  }
  async findByName(name: string): Promise<RoleSchema> {
    return await this.roleRepository.findOne({ name: name }).exec();
  }
}
