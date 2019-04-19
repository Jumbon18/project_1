import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Session } from '../../../data/database/entities/entity.session';
import { SessionManager } from '../../../domain/session/session.manager';
import { CreateSessionDto } from '../../../entities/create-session.dto';

@Controller('api/user')
export class SessionController {
  constructor(private readonly service: SessionManager) {}

  @Post()
  public async create(@Body() CreateSessionDto: CreateSessionDto): Promise<Session> {
    const session: Session = await this.service.create(CreateSessionDto);
    return await this.service.save(session);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(): Promise<Session[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id): Promise<Session> {
    return await this.service.findOne(id);
  }

  @Delete(':id')
  public async delete(@Param('id') id): Promise<void> {
    await this.service.delete(id);
  }
}