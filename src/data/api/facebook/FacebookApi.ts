import {api} from "fb"
import {FacebookResponse} from "data/api/facebook/FacebookResponse";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class FacebookController {
    constructor() {
    }

    public authenticate(token: string): Promise<FacebookResponse> {
        return new Promise((resolve, reject) => {
            const params = {
                "fields": "email,name",
                "access_token": token,
            };
            api(`me`, params, (response: FacebookResponse) => {
                console.log(response.id);
               resolve(response);
            });
        });
    }
}
