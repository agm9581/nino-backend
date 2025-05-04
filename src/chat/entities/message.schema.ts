import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema() // enables createdAt / updatedAt automatically
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  // Allow manual setting of the createdAt field
  @Prop({ required: true })
  createdAt: string; // We'll set this manually from the frontend

  // createdAt and updatedAt will be set automatically if not provided
  @Prop()
  updatedAt: string; // Optional: If you need to track when the message was last updated
}

export const MessageSchema = SchemaFactory.createForClass(Message);
