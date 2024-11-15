import { Role } from '../domain/aggregates/Role';

export interface RolePersistence {
  create(role: Role): Promise<Role>;
  findAll(): Promise<Role[]>;
  findOne(id: string): Promise<Role>;
  findByName(name: string): Promise<Role>;
}
