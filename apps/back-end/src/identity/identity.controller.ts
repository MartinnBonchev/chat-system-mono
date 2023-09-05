import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { IdentityService, ValidUser } from './identity.service';
import RegisterRequestDto from './dto/register.dto';
import LoginRequestDto from './dto/login.dto';
import JwtAuthGuard from '@guards/jwt.guard';
import User from '@decorators/user.decorator';

@Controller('auth')
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
  @UseGuards(JwtAuthGuard)
  async me(@User() requestUser: ValidUser) {
    const user = await this.identityService.getOneById(requestUser.id);

    if (!user) {
      throw new UnauthorizedException('Unauthorized!');
    }

    const access_token = await this.identityService.generateJWTToken(user);
    return { user, access_token };
  }
}
