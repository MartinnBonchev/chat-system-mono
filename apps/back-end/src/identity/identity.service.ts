import { EntityManager } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import RegisterRequestDto from './dto/register.dto';
import LoginRequestDto from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/identity.entity';
import { compare } from '@utils/encrypt.utils';

interface ValidUser {}

@Injectable()
export class IdentityService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, password }: RegisterRequestDto) {}

  async login({ email, password }: LoginRequestDto) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new BadRequestException(
        'Authentication failed, please check your credentials.',
      );
    }

    const access_token = await this.generateJWTToken(user);
    return { user, access_token };
  }

  async getOneById(id: number): Promise<MaybeNullable<ValidUser>> {
    const user = await this.entityManager.findOneBy(User, { id });

    if (!user) {
      return null;
    }

    return {
      email: user.email,
      id: user.id,
    };
  }

  async generateJWTToken(user: ValidUser) {
    const accessToken = this.jwtService.sign(user);

    return accessToken;
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<MaybeNullable<ValidUser>> {
    const dbUser = await this.entityManager.findOneBy(User, { email });

    if (!dbUser) {
      return null;
    }

    const { password_hash: userPassword, ...user } = dbUser;

    const hasValidPassword = await compare(password, userPassword);

    if (!hasValidPassword) {
      return null;
    }

    return user;
  }
}
