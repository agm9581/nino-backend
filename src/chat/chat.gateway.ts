import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: MessageDto) {
    this.server.emit('message', data);

    console.log(this.chatService);
    try {
      console.log('Calling chatService.create()...');
      console.log('data received', data);
      await this.chatService.create(data);

      console.log('Message saved successfully!');
    } catch (error) {
      console.error('Failed to save message to DB:', error);
    }
  }
}
