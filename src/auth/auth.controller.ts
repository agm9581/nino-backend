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
  InternalServerErrorException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MemberDto } from 'src/members/dto/member.dto';
import { Member } from 'src/members/entities/member.schema';

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
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() body: MemberDto) {
    const registered = await this.authService.register(body);
    if (registered) {
      return { registration: 'Success' };
    }
    throw new InternalServerErrorException('Something went wrong');
  }
}
