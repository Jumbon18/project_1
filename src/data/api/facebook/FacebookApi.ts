import {api} from "fb"
import * as https from "https";
import {FacebookResponse} from "data/api/facebook/FacebookResponse";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class FacebookController {
    constructor() {
    }

    public authenticate(token: string): Promise<FacebookResponse> {
        return new Promise((resolve, reject) => {
            api(`debug_token?access_token=${token}&input_token=${token}`, response => {
                console.log(response)
            });
        });
    }
}
