import { IsString } from 'class-validator';
import * as uuid from 'uuid/v4';

export class UserDto {
  @IsString()
  readonly id: uuid;

  @IsString()
  readonly email: string;
}