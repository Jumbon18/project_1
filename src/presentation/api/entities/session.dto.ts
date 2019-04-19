import { IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class SessionDto {
  @IsString()
  readonly token: string;

  @IsString()
  readonly user: UserDto;
}