import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.schema';
import { ChatController } from './chat.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]), JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME') },
      };
    },
  })],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
