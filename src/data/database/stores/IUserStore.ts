import User from "data/database/entities/User";

export default abstract class IUserStore {
    abstract createUser(email: string): Promise<User>;
    abstract findUser(email: string): Promise<User | undefined>;
}
