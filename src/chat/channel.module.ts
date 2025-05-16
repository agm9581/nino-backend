import { Module } from '@nestjs/common';

import { ChannelGateway } from './channel.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.schema';

import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME') },
        };
      },
    }),
  ],
  providers: [ChannelGateway, ChannelService],
  controllers: [ChannelController],
})
export class channelModule {}
