import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import IUserStore from "./IUserStore";
import User from "../entities/User";

@Injectable()
export class UserStore extends IUserStore {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) {
        super();
    }

    async createUser(email: string) {
        const user = await this.repository.create({email});
        await this.repository.insert(user);
        return user;
    }

    async findUser(email: string) {
        return await this.repository.findOne({"email": email});
    }
}
