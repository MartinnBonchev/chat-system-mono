import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

import PasswordDto from './password.dto';

export default class RegisterRequestDto extends PasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;
}
