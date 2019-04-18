import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/entity.user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto, salt: string): Promise<User> {
    let { email, password } = createUserDto;
    return await this.repository.create({ email: email, password_hash: password, salt: salt });
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email: email });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

