import { Controller, Get, Query } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('messages')
  async getMessages(
    @Query('before') before: string, // message ID or timestamp
    @Query('limit') limit: number = 20,
  ) {
    console.log('Fetching messages');
    return this.channelService.getMessagesBefore(before, limit);
  }
}
