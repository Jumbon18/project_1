import User from "data/database/entities/User";
import FacebookLogin from "data/database/entities/FacebookLogin";

export default abstract class IFacebookLoginStore {
    abstract create(user: User, facebookUserId: string): Promise<FacebookLogin>;
    abstract findOneByFacebookUserId(facebookUserId: string): Promise<boolean | undefined>;
}
