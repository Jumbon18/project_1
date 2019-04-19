import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CreateUserDto} from "presentation/api/entities/CreateUserDto";
import {User} from "data/database/entities/User";
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepositoryModule} from "data/repositories/UserRepositoryModule";

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(UserRepositoryModule) private readonly repository: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto, salt: string): Promise<User> {
        let {email, password} = createUserDto;
        const user = await this.repository.create({email: email, password_hash: password, salt: salt});
        await this.repository.insert(user);
        return user;
    }

    async findOne(id: number): Promise<User> {
        return await this.repository.findOne(id);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.repository.findOne({email: email});
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}