import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageModel } from '../model/message.model';
import { Message, MessageDocument } from '../schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}
  async create(createMessageModel: CreateMessageModel): Promise<Message> {
    const createdMessage = await this.messageModel.create(createMessageModel);
    return createdMessage;
  }
  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
