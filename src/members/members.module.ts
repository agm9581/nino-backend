import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './entities/member.schema';
import { HashService } from './hash.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }])],
  controllers: [MembersController],
  providers: [MembersService, HashService],
  exports: [MembersService],
})
export class MembersModule {}
