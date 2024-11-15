import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Address } from 'src/application/domain/aggregates/Address';

export type CustomerDocument = HydratedDocument<CustomerEntity>;

@Schema()
export class CustomerEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  document: string;

  @Prop()
  phone: string;

  @Prop({ type: Address })
  address: Address;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);
