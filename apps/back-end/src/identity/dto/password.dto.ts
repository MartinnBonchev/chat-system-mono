import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class PasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
