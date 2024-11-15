import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerServiceInputPort } from '../input/CustomerServiceInputPort';
import { Customer } from '../domain/models/Customer';
import { CustomerPersistence } from '../output/CustomerPersistenceOutputPort';
import { Address } from '../domain/aggregates/Address';

@Injectable()
export class CustomerService implements CustomerServiceInputPort {
  constructor(
    @Inject('CustomerPersistence')
    private readonly customerPersistence: CustomerPersistence,
  ) {}
  async create(customer: Customer): Promise<Customer> {
    const customerCreated = new Customer(
      customer.name,
      customer.email,
      customer.document,
      customer.phone,
      new Address(
        customer.address.zipcode,
        customer.address.street,
        customer.address.number,
        customer.address.neighborhood,
        customer.address.city,
        customer.address.complement,
      ),
    );

    return await this.customerPersistence.create(customerCreated);
  }
  async update(id: string, customer: Customer): Promise<void> {
    const existingCustomer = await this.customerPersistence.findOne(id);
    if (!existingCustomer) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.customerPersistence.update(
      id,
      new Customer(
        customer.name,
        customer.email,
        customer.document,
        customer.phone,
        new Address(
          customer.address.zipcode,
          customer.address.street,
          customer.address.number,
          customer.address.neighborhood,
          customer.address.city,
          customer.address.complement,
        ),
      ),
    );
  }
  async findAll(): Promise<Customer[]> {
    return await this.customerPersistence.findAll();
  }
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerPersistence.findOne(id);
    if (!customer) {
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
    }
    return customer;
  }
  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return await this.customerPersistence.delete(id);
  }
}
