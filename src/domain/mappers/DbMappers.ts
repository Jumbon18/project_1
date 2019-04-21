import DbSession from "data/database/entities/Session";
import Session from "entities/Session";
import DbUser from "data/database/entities/User";
import User from "entities/User";

export const mapDbSession = (session: DbSession): Session => ({
    token: session.token,
    user: mapDbUser(session.user),
});

export const mapDbUser = (user: DbUser): User => ({
    id: user.id,
    email: user.email,
});
