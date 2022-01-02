import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  messageContent: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  recieverId: string;

  @Prop({ required: true })
  sendDate: string = new Date().toLocaleDateString();
}

export const MessageSchema = SchemaFactory.createForClass(Message);
