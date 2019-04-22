import {Injectable} from '@nestjs/common';
import * as passport from "passport";
import {IFacebookConfig} from "domain/auth/strategies/IFacebookConfig";
import User from "data/database/entities/User";
import IUserStore from "data/database/stores/IUserStore";


const FACEBOOK_APP_ID = "2647190028686893";
const FACEBOOK_APP_SECRET = "c6a02c11a1d96bdbf90a5422605393cc";

@Injectable()
export class FacebookStrategy {
    constructor(
        private readonly userStore: IUserStore,
    ) {
        this.init();
    }

    private async init() {
        const FacebookTokenStrategy = require('passport-facebook-token');
        passport.use(new FacebookTokenStrategy({
                clientID: FACEBOOK_APP_ID,
                clientSecret: FACEBOOK_APP_SECRET,
                fbGraphVersion: 'v3.0'
            }, function (accessToken: string, refreshToken: string, profile: IFacebookConfig) {
                return await this.userStore.findOneByEmail({facebookId: profile.client_id})
            }
        ));
    }
}
