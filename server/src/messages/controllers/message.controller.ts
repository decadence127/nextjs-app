import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageModel } from '../model/message.model';
import { Message, MessageSchema } from '../schemas/message.schema';
import { MessageService } from '../services/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(
    @Body() createMessageModel: CreateMessageModel,
  ): Promise<Message> {
    const createdMessage = await this.messageService.create(createMessageModel);
    return createdMessage;
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }
}
