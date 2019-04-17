import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  password_hash: string;

  @IsString()
  @IsNotEmpty()
  salt: string;
}
