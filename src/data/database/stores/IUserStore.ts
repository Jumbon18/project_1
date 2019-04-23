import User from "data/database/entities/User";

export default abstract class IUserStore {
    abstract create(email: string): Promise<User>;
    abstract findOneByEmail(email: string): Promise<User | undefined>;
}
