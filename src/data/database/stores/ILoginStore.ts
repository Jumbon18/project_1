import User from "data/database/entities/User";
import FacebookLogin from "data/database/entities/FacebookLogin";
import LocalLogin from "data/database/entities/LocalLogin";

export default abstract class ILoginStore {
    abstract createLocal(user: User, passwordHash: string, salt: string): Promise<LocalLogin>;
    abstract createFacebook(user: User, facebookUserId: string): Promise<FacebookLogin>;
    abstract findOneLocal(user: User): Promise<LocalLogin | undefined>;
    abstract findOneByFacebookId(facebookUserId: string): Promise<boolean | undefined>;
}
