import { Controller, Post, Body, Get } from '@nestjs/common';
import { IdentityService } from './identity.service';
import RegisterRequestDto from './dto/register.dto';
import LoginRequestDto from './dto/login.dto';

@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto) {
    return this.identityService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto) {
    return this.identityService.login(loginDto);
  }

  @Get('logout')
  async logout() {
    return { access_token: null, user: null };
  }

  @Get('me')
  async me() {}
}
