import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CustomerEntity } from './CustomerEntity';

export type ReceivableDocument = HydratedDocument<ReceivableEntity>;

@Schema()
export class ReceivableEntity {
  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  emissionDate: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: CustomerEntity.name })
  assignor: Types.ObjectId;
}

export const ReceivableSchema = SchemaFactory.createForClass(ReceivableEntity);
