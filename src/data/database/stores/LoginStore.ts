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
        @InjectRepository(User) private readonly facebookRepository: Repository<FacebookLogin>,
        @InjectRepository(User) private readonly localRepository: Repository<LocalLogin>,
    ) {
        super();
    }

    async createLocal(user: User, passwordHash: string, salt: string): Promise<LocalLogin> {
        const localUser = await this.localRepository.create({user, passwordHash, salt});
        await this.localRepository.insert(localUser);
        return localUser;
    }

    async createFacebook(user: User, facebookUserId: string): Promise<FacebookLogin> {
        const facebookUser = await this.facebookRepository.create({user, facebookUserId});
        await this.facebookRepository.insert(facebookUser);
        return facebookUser;
    }

    async findOneLocal(user: User): Promise<LocalLogin | undefined> {
        return await this.localRepository.findOne({user});
    }

    async findOneByFacebookId(facebookUserId: string): Promise<boolean | undefined> {
        const facebookUser = await this.facebookRepository.findOne({facebookUserId});
        return !!facebookUser;
    }

}
