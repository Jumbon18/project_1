import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import User from "../entities/User";
import ILoginStore from "data/database/stores/ILoginStore";
import FacebookLogin from "data/database/entities/FacebookLogin";
import LocalLogin from "data/database/entities/LocalLogin";

@Injectable()
export class LoginStore extends ILoginStore {
    constructor(
        @InjectRepository(LocalLogin) private readonly localLoginRepository: Repository<LocalLogin>,
        @InjectRepository(FacebookLogin) private readonly facebookLoginRepository: Repository<FacebookLogin>,
    ) {
        super();
    }

    async createLocalLogin(user: User, email: string, passwordHash: string, salt: string) {
        const localUser = await this.localLoginRepository.create({user, email, passwordHash, salt});
        await this.localLoginRepository.insert(localUser);
        return localUser;
    }

    async createFacebookLogin(user: User, facebookUserId: string) {
        const facebookUser = await this.facebookLoginRepository.create({user, facebookUserId});
        await this.facebookLoginRepository.insert(facebookUser);
        return facebookUser;
    }

    async findLocalLogin(email: string) {
        return await this.localLoginRepository.findOne(
            {email},
            {
                relations: ["user"],
            },
        );
    }

    async findFacebookLogin(facebookUserId: string) {
        return await this.facebookLoginRepository.findOne(
            {facebookUserId},
            {
                relations: ["user"],
            }
        );
    }

    async updateLocalLogin(email: string, fields: {passwordHash: string, salt: string}) {
        await this.localLoginRepository.update({"email": email}, fields);
    }
}
