import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerPersistence } from 'src/application/output/CustomerPersistenceOutputPort';
import {
  CustomerSchema,
  CustomerDocument,
} from '../../persistence/entities/CustomerEntity';

@Injectable()
export class CustomerPersistenceAdapter implements CustomerPersistence {
  constructor(
    @InjectModel(CustomerSchema.name)
    private customerRepository: Model<CustomerDocument>,
  ) {}

  async create(customer: CustomerSchema): Promise<CustomerSchema> {
    const createdCustomer = new this.customerRepository(customer);
    return await createdCustomer.save();
  }

  async update(id: string, customer: CustomerSchema): Promise<void> {
    await this.customerRepository.findByIdAndUpdate(id, customer);
  }

  async findAll(): Promise<CustomerSchema[]> {
    return await this.customerRepository.find().exec();
  }

  async findOne(id: string): Promise<CustomerSchema> {
    return await this.customerRepository.findById(id).exec();
  }

  async delete(id: string): Promise<void> {
    await this.customerRepository.findByIdAndDelete(id);
  }
}
