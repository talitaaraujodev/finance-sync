import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<CustomerEntity>;

interface AddressType {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

@Schema()
export class CustomerEntity {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  document: string;

  @Prop({ type: String })
  phone: string;

  @Prop({
    required: true,
    type: {
      street: { type: String, required: true },
      number: { type: String, required: true },
      complement: { type: String, required: false },
      neighborhood: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
  })
  address: AddressType;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);
