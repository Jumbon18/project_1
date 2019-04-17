import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../entities/entity.user';

export class CreateSessionDto {

  constructor(private readonly User, private readonly Token) {}

  @IsString()
  @IsNotEmpty()
  user: User;

  @IsString()
  @IsNotEmpty()
  token: string;
}
