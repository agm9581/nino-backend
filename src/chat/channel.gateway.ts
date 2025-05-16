import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { MessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChannelService } from './channel.service';

@WebSocketGateway({ cors: true })
export class ChannelGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly channelService: ChannelService,
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
  async handleMessage(@MessageBody() data: MessageDto, @ConnectedSocket() client: Socket) {
    const { content, createdAt, channelId } = data;
    const user = (client as any).user;
    const message = {
      sender: user.sub, // or user.email
      content: data.content,
    };
    try {
      // Save the message with the received timestamp
      await this.channelService.create({ sender: message.sender, content, createdAt, channelId });

      // Emit the message back to all clients with the timestamp
      this.server.emit('message', { content, createdAt });

      console.log('Message saved successfully with timestamp:', createdAt);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }
}
