import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReceivablePersistence } from 'src/application/output/ReceivablePersistenceOutputPort';
import { Receivable } from 'src/application/domain/models/Receivable';
import { ReceivableEntity } from '../entities/ReceivableEntity';

@Injectable()
export class ReceivablePersistenceAdapter implements ReceivablePersistence {
  constructor(
    @InjectModel(ReceivableEntity.name)
    private receivableRepository: Model<ReceivableEntity>,
  ) {}

  async create(receivable: Receivable): Promise<Receivable> {
    const createdCustomer = new this.receivableRepository(receivable);
    const savedCustomer = await createdCustomer.save();
    return new Receivable(
      savedCustomer.value,
      savedCustomer.assignor.toString(),
      savedCustomer.emissionDate,
      savedCustomer._id.toString(),
    );
  }

  async update(id: string, receivable: Receivable): Promise<void> {
    await this.receivableRepository.findByIdAndUpdate(id, receivable);
  }

  async findAll(): Promise<Receivable[]> {
    const receivableDocuments = await this.receivableRepository.find();
    return receivableDocuments.map((doc) => {
      return new Receivable(
        doc.value,
        doc.assignor.toString(),
        doc.emissionDate,
        doc._id.toString(),
      );
    });
  }

  async findOne(id: string): Promise<Receivable> {
    const receivableDocument = await this.receivableRepository.findById(id);
    if (!receivableDocument) return null;

    return new Receivable(
      receivableDocument.value,
      receivableDocument.assignor.toString(),
      receivableDocument.emissionDate,
      receivableDocument._id.toString(),
    );
  }

  async delete(id: string): Promise<void> {
    await this.receivableRepository.findByIdAndDelete(id);
  }
}
