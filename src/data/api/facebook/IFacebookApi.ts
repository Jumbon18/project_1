import {FacebookResponse} from "data/api/facebook/FacebookResponse";

export default abstract class IFacebookApi {
    abstract authenticate(token: string): Promise<FacebookResponse>;
}
