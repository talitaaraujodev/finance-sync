import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePersistence } from 'src/application/output/RolePersistenceOutputPort';
import { Role } from 'src/application/domain/aggregates/Role';
import { RoleEntity } from '../entities/RoleEntity';

@Injectable()
export class RolePersistenceAdapter implements RolePersistence {
  constructor(
    @InjectModel(RoleEntity.name)
    private roleRepository: Model<RoleEntity>,
  ) {}

  async create(role: Role): Promise<Role> {
    const createdRole = new this.roleRepository(role);
    const savedRole = await createdRole.save();
    return new Role(savedRole.name, savedRole._id.toString());
  }

  async findAll(): Promise<Role[]> {
    const roleDocuments = await this.roleRepository.find();
    return roleDocuments.map((doc) => {
      return new Role(doc.name, doc._id.toString());
    });
  }

  async findOne(id: string): Promise<Role> {
    const roleDocument = await this.roleRepository.findById(id);
    if (!roleDocument) return null;
    return new Role(roleDocument.name, roleDocument._id.toString());
  }
  async findByName(name: string): Promise<Role> {
    const roleDocument = await this.roleRepository.findOne({ name });
    if (!roleDocument) return null;
    return new Role(roleDocument.name, roleDocument._id.toString());
  }
}
