import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from '@nestjs/typeorm';
import User from "../entities/User";
import IFacebookLoginStore from "data/database/stores/IFacebookLoginStore";
import FacebookLogin from "data/database/entities/FacebookLogin";

@Injectable()
export class FacebookLoginStore extends IFacebookLoginStore {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<FacebookLogin>,
    ) {
        super();
    }

    async create(user: User, facebookUserId: string): Promise<FacebookLogin> {
        const facebookUser = await this.repository.create({user, facebookUserId});
        await this.repository.insert(facebookUser);
        return facebookUser;
    }

    async findOneByFacebookUserId(facebookUserId: string): Promise<boolean | undefined> {
        const facebookUser = await this.repository.findOne({facebookUserId});
        return !!facebookUser;
    }
}
