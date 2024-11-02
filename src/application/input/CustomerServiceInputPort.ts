import { Customer } from '../domain/models/Customer';

export interface CustomerServiceInputPort {
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Customer): Promise<void>;
  findAll(): Promise<Customer[]>;
  findOne(id: string): Promise<Customer>;
  delete(id: string): Promise<void>;
}
