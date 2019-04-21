import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CreateUserDto} from "presentation/api/entities/CreateUserDto";
import User from "data/database/entities/User";
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserStore {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto, salt: string): Promise<User> {
        let {email, password} = createUserDto;
        const user = await this.repository.create({email: email, password_hash: password, salt: salt});
        await this.repository.insert(user);
        return user;
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.repository.findOne({email: email});
    }
}
