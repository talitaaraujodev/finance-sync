import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerPersistence } from 'src/application/output/CustomerPersistenceOutputPort';
import { Customer } from 'src/application/domain/models/Customer';
import { Address } from 'src/application/domain/aggregates/Address';
import { CustomerEntity } from '../entities/CustomerEntity';

@Injectable()
export class CustomerPersistenceAdapter implements CustomerPersistence {
  constructor(
    @InjectModel(CustomerEntity.name)
    private customerRepository: Model<CustomerEntity>,
  ) {}

  async create(customer: Customer): Promise<Customer> {
    const createdCustomer = new this.customerRepository(customer);
    const savedCustomer: any = await createdCustomer.save();
    return new Customer(
      savedCustomer.name,
      savedCustomer.email,
      savedCustomer.document,
      savedCustomer.phone,
      savedCustomer.address as Address,
      savedCustomer._id.toString(),
    );
  }

  async update(id: string, customer: Customer): Promise<void> {
    await this.customerRepository.findByIdAndUpdate(id, customer);
  }

  async findAll(): Promise<Customer[]> {
    const customerDocuments = await this.customerRepository.find();
    return customerDocuments.map((doc: any) => {
      return new Customer(
        doc.name,
        doc.email,
        doc.document,
        doc.phone,
        doc.address as Address,
        doc._id.toString(),
      );
    });
  }

  async findOne(id: string): Promise<Customer> {
    const customerDocument: any = await this.customerRepository.findById(id);
    if (!customerDocument) return null;

    return new Customer(
      customerDocument.name,
      customerDocument.email,
      customerDocument.document,
      customerDocument.phone,
      customerDocument.address as Address,
      customerDocument._id.toString(),
    );
  }

  async delete(id: string): Promise<void> {
    await this.customerRepository.findByIdAndDelete(id);
  }
}
