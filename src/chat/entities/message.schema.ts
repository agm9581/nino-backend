import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'Member', required: true })
  sender: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Member', required: false })
  receivers: Types.ObjectId[];

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Channel', required: true })
  channelId: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Member' }],
    default: [],
  })
  participants: Types.ObjectId[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
