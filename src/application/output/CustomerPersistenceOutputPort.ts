import { CustomerSchema as Customer } from '../../adapter/output/persistence/entities/CustomerEntity';

export interface CustomerPersistence {
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Customer): Promise<void>;
  findAll(): Promise<Customer[]>;
  findOne(id: string): Promise<Customer>;
  delete(id: string): Promise<void>;
}
