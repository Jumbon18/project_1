import {api} from "fb"
import {FacebookResponse} from "data/api/facebook/FacebookResponse";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class FacebookController {
    constructor() {
    }

    public authenticate(token: string): Promise<FacebookResponse> {
        return new Promise((resolve, reject) => {
            api(`me?fields=email,name&access_token=${token}`, response => {
                console.log(response)
            });
        });
    }
}
