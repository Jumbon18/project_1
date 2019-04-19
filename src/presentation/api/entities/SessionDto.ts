import { IsString } from 'class-validator';
import { UserDto } from 'presentation/api/entities/UserDto';

export class SessionDto {
  @IsString()
  readonly token: string;

  @IsString()
  readonly user: UserDto;
}