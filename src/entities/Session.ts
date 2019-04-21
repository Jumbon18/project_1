import User from "./User";

export default interface Session {
    token: string;
    user: User;
}
