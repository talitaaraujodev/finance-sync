import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<RoleEntity>;

@Schema()
export class RoleEntity {
  @Prop({ required: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleEntity);
