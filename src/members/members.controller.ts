import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './entities/member.schema';
import { isValidObjectId } from 'mongoose';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // @Post()
  // create(@Body() createMemberDto: Member) {
  //   return this.membersService.create(createMemberDto);
  // }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.membersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemberDto: Partial<Member>) {
  //   return this.membersService.update(+id, updateMemberDto);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    console.log(`MembersController Delete called with id to delete  ${id}`);
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    await this.membersService.deleteOneById(id);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
