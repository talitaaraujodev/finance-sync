import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReceivablePersistence } from 'src/application/output/ReceivablePersistenceOutputPort';
import {
  ReceivableSchema,
  ReceivableDocument,
} from '../../persistence/entities/ReceivableEntity';

@Injectable()
export class ReceivablePersistenceAdapter implements ReceivablePersistence {
  constructor(
    @InjectModel(ReceivableSchema.name)
    private receivableRepository: Model<ReceivableDocument>,
  ) {}

  async create(receivable: ReceivableSchema): Promise<ReceivableSchema> {
    const createdReceivable = new this.receivableRepository(receivable);
    return await createdReceivable.save();
  }

  async update(id: string, receivable: ReceivableSchema): Promise<void> {
    await this.receivableRepository.findByIdAndUpdate(id, receivable);
  }

  async findAll(): Promise<ReceivableSchema[]> {
    return await this.receivableRepository.find().exec();
  }

  async findOne(id: string): Promise<ReceivableSchema> {
    return await this.receivableRepository.findById(id).exec();
  }

  async delete(id: string): Promise<void> {
    await this.receivableRepository.findByIdAndDelete(id);
  }
}
