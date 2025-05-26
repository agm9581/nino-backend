import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './entities/message.schema';
import { MessageDto } from './dto/message.dto';
import { ChannelDto } from './dto/channel.dto';
import { Channel } from './entities/channel.schema';
import { create } from 'domain';
import { MembersService } from 'src/members/members.service';


@Injectable()
export class ChannelService {
  constructor(private memberService: MembersService,@InjectModel(Message.name) private messageModel: Model<Message>, @InjectModel(Channel.name) private channelModel: Model<Channel>) {}
  async getMessagesBefore(before: string, limit: number) {
    const query: any = {};
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }

    return this.messageModel.find(query).sort({ createdAt: -1 }).limit(limit).exec();
  }

  async createMessage(createMessageDto: MessageDto): Promise<void> {
    const { sender, content, createdAt } = createMessageDto;

    try {
      // Log the data before attempting to save
      console.log('Saving message:', { sender, content });
      const messageData = {
        sender: new Types.ObjectId(sender), // Convert string to ObjectId
        content,
        createdAt,
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

  async getPublicChannels(){
    return await this.channelModel.find({private:false})

  }

  async createChannel(createChannelDto: ChannelDto){
    // createChannelDto.private = true; 
    // if(!createChannelDto.owner){
    //   throw new Error("Channel owner is required");
    // }
    // if(!(await this.memberService.findOneByParam({id:createChannelDto.owner}))){
    // throw new Error("Channel owner does not exist");
    // }
    const channel = new this.channelModel(createChannelDto)

   await channel.save()
    return {"success":channel}
  }

}
