import User from "data/database/entities/User";
import FacebookLogin from "data/database/entities/FacebookLogin";
import LocalLogin from "data/database/entities/LocalLogin";

export default abstract class ILoginStore {
    abstract createLocalLogin(user: User, email: string, passwordHash: string, salt: string): Promise<LocalLogin>;
    abstract createFacebookLogin(user: User, facebookUserId: string): Promise<FacebookLogin>;
    abstract findLocalLogin(email: string): Promise<LocalLogin | undefined>;
    abstract findFacebookLogin(facebookUserId: string): Promise<FacebookLogin | undefined>;
}
