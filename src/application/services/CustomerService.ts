import { Inject, Injectable } from '@nestjs/common';
import { CustomerServiceInputPort } from '../input/CustomerServiceInputPort';
import { Customer } from '../domain/models/Customer';
import { CustomerPersistence } from '../output/CustomerPersistenceOutputPort';

@Injectable()
export class CustomerService implements CustomerServiceInputPort {
  constructor(
    @Inject('CustomerPersistence')
    private readonly customerPersistence: CustomerPersistence,
  ) {}
  async create(customer: Customer): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, customer: Customer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
