import User from "data/database/entities/User";

export default abstract class IUserStore {
    abstract create(email: string, passwordHash: string, salt: string): Promise<User>;
    abstract findOneByEmail(email: string): Promise<User | undefined>;
}
