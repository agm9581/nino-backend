import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from '../chat/entities/message.schema';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}
  async getMessagesBefore(before: string, limit: number) {
    const query: any = {};
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    return this.messageModel.find(query).sort({ createdAt: -1 }).limit(limit).exec();
  }

  async create(createMessageDto: MessageDto): Promise<void> {
    const { sender, content } = createMessageDto;

    try {
      // Log the data before attempting to save
      console.log('Saving message:', { sender, content });
      const messageData = {
        sender: new Types.ObjectId(sender), // Convert string to ObjectId
        content
      };
      // Create and save the message
      const message = new this.messageModel(messageData);
      await message.save(); // Save to DB asynchronously
      console.log('Message successfully saved to DB:', message);
    } catch (error) {
      console.error('Error saving message to DB:', error);
      if (error.errInfo && error.errInfo.details) {
        console.error(
          'Validation details:',
          JSON.stringify(error.errInfo.details.schemaRulesNotSatisfied, null, 2),
        );
      }
    }
  }
}
