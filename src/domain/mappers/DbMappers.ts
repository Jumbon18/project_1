import DbSession from "data/database/entities/Session";
import Session from "entities/Session";
import DbUser from "data/database/entities/User";
import User from "entities/User";

export const mapFromDbSession = (session: DbSession): Session => ({
    token: session.token,
    user: mapFromDbUser(session.user),
});

export const mapFromDbUser = (user: DbUser): User => ({
    id: user.id,
    email: user.email,
});
