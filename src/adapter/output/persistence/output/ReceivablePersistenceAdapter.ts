import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReceivablePersistence } from 'src/application/output/ReceivablePersistenceOutputPort';
import {
  ReceivableSchema,
  ReceivableDocument as Receivable,
} from '../../persistence/entities/ReceivableEntity';

@Injectable()
export class ReceivablePersistenceAdapter implements ReceivablePersistence {
  constructor(
    @InjectModel(ReceivableSchema.name)
    private receivableRepository: Model<Receivable>,
  ) {}

  async create(receivable: Receivable): Promise<Receivable> {
    const createdReceivable = new this.receivableRepository(receivable);
    return await createdReceivable.save();
  }

  async update(id: string, receivable: Receivable): Promise<void> {
    await this.receivableRepository.findByIdAndUpdate(id, receivable);
  }

  async findAll(): Promise<Receivable[]> {
    return await this.receivableRepository.find().exec();
  }

  async findOne(id: string): Promise<Receivable> {
    return await this.receivableRepository.findById(id).exec();
  }

  async delete(id: string): Promise<void> {
    await this.receivableRepository.findByIdAndDelete(id);
  }
}
