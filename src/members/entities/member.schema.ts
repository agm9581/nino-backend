import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

enum FriendshipStatus {
  INVITED = 'invited',
  BLOCKED = 'blocked',
  FRIEND = 'friend',
}

@Schema({ timestamps: true })
export class Member {
  @Prop({ required: true, match: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8, maxlength: 100 })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  secondName: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    type: [
      {
        memberId: { type: Types.ObjectId, ref: 'Member' },
        status: { type: String, enum: FriendshipStatus },
      },
    ],
    default: [],
  })
  friends: { memberId: Types.ObjectId; status: FriendshipStatus }[];

  @Prop({ required: true, default: 'offline' })
  memberStatus: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
