import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({ timestamps: true })
export class Channel {
  @Prop({ required: true })
  title: string;

  @Prop({  required: true })
  private: boolean;


  @Prop({ type: Types.ObjectId, ref: 'Member' })
  owner: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Member' }],
    default: [],
  })
  invitees: Types.ObjectId[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
