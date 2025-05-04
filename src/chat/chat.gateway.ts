import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify(token); // throws if invalid
      (client as any).user = payload; // optionally attach user to socket
      console.log('WebSocket authenticated:', payload);
    } catch (err) {
      console.error('WebSocket auth failed:', err.message);
      client.disconnect();
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { content: string; createdAt: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { content, createdAt } = data;
    const user = (client as any).user;
    const message = {
      sender: user.sub, // or user.email
      content: data.content,
    };
    try {
      // Save the message with the received timestamp
      await this.chatService.create({ sender: message.sender, content, createdAt });

      // Emit the message back to all clients with the timestamp
      this.server.emit('message', { content, createdAt });

      console.log('Message saved successfully with timestamp:', createdAt);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }
}
