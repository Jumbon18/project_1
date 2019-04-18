import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../entities/entity.user';

export class CreateSessionDto {

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  @IsString()
  @IsNotEmpty()
  user: User;

  @IsString()
  @IsNotEmpty()
  token: string;
}
