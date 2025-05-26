import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberDto } from 'src/members/dto/member.dto';
import { Member } from 'src/members/entities/member.schema';
import { HashService } from 'src/members/hash.service';

import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private membersService: MembersService,
    private jwtService: JwtService,
  ) {}
  async login(body: MemberDto) {
    const isPasswordMatch = await this.membersService.comparePassword(body);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid login credentials');
    }
    const member = await this.membersService.findOneByParam({ email: body.email });
    const payload = { sub: member.id, email: member.email };

    const jwt = { access_token: await this.jwtService.signAsync(payload) };
    return jwt;
  }

  async register(body: MemberDto) {
    const { email, password } = body;
    return await this.membersService.create(body);
  }
}
