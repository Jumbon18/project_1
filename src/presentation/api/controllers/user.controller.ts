import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { User } from 'data/database/entities/User';
import { UserManager } from 'domain/user/UserManager';
import { CreateUserDto } from 'entities/CreateUserDto';

@Controller('api/user')
export class UserController {
  constructor(private readonly service: UserManager) {
  }

  @Post('create')
  public async create(@Body() createUser: CreateUserDto,@Body() salt: string): Promise<User> {
    const user: User = await this.service.create(createUser, salt);
    return await this.service.save(user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id): Promise<User> {
    return await this.service.findOne(id);
  }

  @Delete(':id')
  public async delete(@Param('id') id): Promise<void> {
    await this.service.delete(id);
  }
}
