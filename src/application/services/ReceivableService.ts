import { Inject, Injectable } from '@nestjs/common';
import { ReceivableServiceInputPort } from '../input/ReceivableServiceInputPort';
import { ReceivablePersistence } from '../output/ReceivablePersistenceOutputPort';
import { Receivable } from '../domain/models/Receivable';

@Injectable()
export class ReceivableService implements ReceivableServiceInputPort {
  constructor(
    @Inject('ReceivablePersistence')
    private readonly receivablePersistence: ReceivablePersistence,
  ) {}
  async create(receivable: Receivable): Promise<Receivable> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, Receivable: Receivable): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Receivable[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<Receivable> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
