import { Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from '@utils/encrypt.utils';
import RegisterRequestDto from './dto/register.dto';
import LoginRequestDto from './dto/login.dto';
import { User } from './entities/identity.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface ValidUser {
  id: string;
  email: string;
}

@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, password }: RegisterRequestDto) {
    const existingUser = await this.userRepo.findOne({ where: { email } });

    if (existingUser) {
      return new ConflictException('User already exists!');
    }

    const user = this.userRepo.create({
      email,
      password_hash: hash(password),
    });

    await this.userRepo.save(user);
  }

  async login({
    email,
    password,
  }: LoginRequestDto): Promise<{ user: ValidUser; access_token: string }> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new BadRequestException(
        'Authentication failed, please check your credentials.',
      );
    }

    const access_token = await this.generateJWTToken(user);
    return { user, access_token };
  }

  async getOneById(id: string): Promise<MaybeNullable<ValidUser>> {
    const user = await this.userRepo.findOne({ where: { id } });

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
    const dbUser = await this.userRepo.findOne({ where: { email } });

    if (!dbUser) {
      return null;
    }

    const { password_hash: userPassword, ...user } = dbUser;

    const hasValidPassword = await compare(password, userPassword);

    if (!hasValidPassword) {
      return null;
    }

    return { email: user.email, id: user.id };
  }
}
