import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../entities/entity.user';
import * as uuid from 'uuid/v4';

export class CreateSessionDto {

  constructor(user: uuid, token: string) {
    this.user = user;
    this.token = token;
  }

  @IsString()
  @IsNotEmpty()
  user: uuid;

  @IsString()
  @IsNotEmpty()
  token: string;
}
