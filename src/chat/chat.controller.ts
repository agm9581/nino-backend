import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getMessages(
    @Query('before') before: string, // message ID or timestamp
    @Query('limit') limit: number = 20,
  ) {
    console.log('Fetching messages');
    return this.chatService.getMessagesBefore(before, limit);
  }
}
