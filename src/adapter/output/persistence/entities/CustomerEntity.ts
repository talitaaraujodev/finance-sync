import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = CustomerSchema & Document;

@Schema()
export class CustomerSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  document: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  address: object;
}

export const CustomerEntity = SchemaFactory.createForClass(CustomerSchema);
