// src/chat/schemas/message.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true }) // enables createdAt / updatedAt automatically
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  // createdAt and updatedAt come automatically with timestamps: true
}

export const MessageSchema = SchemaFactory.createForClass(Message);
