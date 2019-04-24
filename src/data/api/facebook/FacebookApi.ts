import {api} from "fb"
import {FacebookResponse} from "data/api/facebook/FacebookResponse";
import {Injectable} from "@nestjs/common";
import IFacebookApi from "data/api/facebook/IFacebookApi";
import {FacebookErrorResponse} from "data/api/facebook/FacebookErrorResponse";

@Injectable()
export default class FacebookApi extends IFacebookApi {
    constructor() {
        super();
    }

    public authenticate(token: string): Promise<FacebookResponse> {
        return new Promise((resolve, reject) => {
            const params = {
                "fields": "email,name",
                "access_token": token,
            };
            api(`me`, params, (response: (FacebookResponse & FacebookErrorResponse) | undefined) => {
                if (!response || response.error) {
                    return reject(new Error("Malformed access token"));
                } else {
                    return resolve(response);
                }
            });
        });
    }
}
