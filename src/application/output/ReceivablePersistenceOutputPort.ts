import { Receivable } from '../domain/models/Receivable';

export interface ReceivablePersistence {
  create(receivable: Receivable): Promise<Receivable>;
  update(id: string, Receivable: Receivable): Promise<void>;
  findAll(): Promise<Receivable[]>;
  findOne(id: string): Promise<Receivable>;
  delete(id: string): Promise<void>;
}
