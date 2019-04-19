import { IsString } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class SessionDto {
  @IsString()
  readonly token: string;

  @IsString()
  readonly user: UserDto;
}