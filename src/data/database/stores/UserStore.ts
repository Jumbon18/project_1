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
        return new Promise<User>(async (resolve, reject) => {
            if (await this.repository.findOne({"email": email})) {
                return reject(new Error("Current user already exists"));
            }
            const user = await this.repository.create({email});
            await this.repository.insert(user);
            return resolve(user);
        });
    }
}
