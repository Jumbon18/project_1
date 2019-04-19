import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from 'data/database/entities/User';
import {CreateUserDto} from 'entities/CreateUserDto';

@Injectable()
export class UserManager {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto, salt: string): Promise<User> {
        let {email, password} = createUserDto;
        const user = await this.repository.create({email: email, password_hash: password, salt: salt});
        await this.repository.insert(user);
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.repository.findOne(id);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.repository.findOne({email: email});
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

