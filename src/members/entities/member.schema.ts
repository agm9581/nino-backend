import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @Prop({ required: true, match: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8, maxlength: 100 })
  password: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
