import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelDto } from './dto/channel.dto';

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

  @Get()
  async getPublicChannels() {
    return await this.channelService.getPublicChannels()
  }

  @Post()
  async createChannel(@Body() channelDto: ChannelDto){
    return await this.channelService.createChannel(channelDto)   
  }
}
