import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = RoleSchema & Document;

@Schema()
export class RoleSchema {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const RoleEntity = SchemaFactory.createForClass(RoleSchema);
