import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CustomerSchema } from './CustomerEntity';

export type ReceivableDocument = ReceivableSchema & Document;

@Schema()
export class ReceivableSchema {
  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  emissionDate: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: CustomerSchema.name })
  assignor: Types.ObjectId;
}
export const ReceivableEntity = SchemaFactory.createForClass(ReceivableSchema);
