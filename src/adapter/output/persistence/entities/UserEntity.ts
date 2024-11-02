import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RoleSchema } from './RoleEntity';

export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: RoleSchema.name }] })
  permissions: Types.ObjectId[];
}

export const UserEntity = SchemaFactory.createForClass(UserSchema);
