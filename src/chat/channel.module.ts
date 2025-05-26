import { Module } from '@nestjs/common';

import { ChannelGateway } from './channel.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.schema';

import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { Channel, ChannelSchema } from './entities/channel.schema';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema },{name: Channel.name, schema: ChannelSchema}]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME') },
        };
      },
    }),MembersModule
  ],
  providers: [ChannelGateway, ChannelService],
  controllers: [ChannelController],
})
export class channelModule {}
