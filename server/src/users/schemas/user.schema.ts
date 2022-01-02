import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 0 })
  permission: number;

  @Prop({ required: true, default: false })
  isBanned: boolean;

  @Prop({ required: true, default: false })
  isOnline: boolean;

  @Prop({ default: null })
  RefreshToken: string;

  @Prop({ default: null })
  RefreshTokenExp: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
