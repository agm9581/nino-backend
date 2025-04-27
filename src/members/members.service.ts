import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MemberDto } from './dto/member.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './entities/member.schema';
import { Model } from 'mongoose';
import { HashService } from './hash.service';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<Member>,
    private hashService: HashService,
  ) {}
  async create(createMemberDto: MemberDto) {
    try {
      let { email, password } = createMemberDto;
      password = await this.hashService.hash(password);
      const newMember = new this.memberModel({ email, password });
      return newMember.save();
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(error);
    }
  }

  async findAll() {
    return await this.memberModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: any) {
    return `This action updates a #${id} member`;
  }

  async deleteOneById(id: string) {
    const result = await this.memberModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async comparePassword(member: MemberDto) {
    const { email, password } = member;
    const userFound = await this.memberModel.findOne({ email: email }).exec();
    if (!userFound) {
      throw new NotFoundException(`No user found with email ${email}`);
    }

    if ((await this.hashService.compare(password, userFound.password)) == false) {
      throw new UnauthorizedException('Password mismatch');
    }
    return true;
  }

  async findOneByParam(param: Record<string, string>) {
    const userFound = await this.memberModel.findOne(param).exec();
    if (!userFound) {
      throw new NotFoundException(`No user found with ${param} as parameter and value`);
    }
    return userFound;
  }
}
