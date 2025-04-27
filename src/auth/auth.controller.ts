import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MemberDto } from 'src/members/dto/member.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(202)
  @Post('login')
  async login(@Body() body: MemberDto): Promise<Record<string, string>> {
    let signedJwt: Record<string, string>;
    try {
      signedJwt = await this.authService.login(body);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return signedJwt;
  }

  @Post('register')
  async register(@Body() body: MemberDto) {
    return await this.authService.register(body);
  }
}
