import Session from "entities/Session";
import ApiSession from "presentation/api/entities/Session";
import User from "entities/User";
import ApiUser from "presentation/api/entities/User";

export const mapToApiSession = (session: Session): ApiSession => ({
    token: session.token,
    user: mapToApiUser(session.user),
});

export const mapToApiUser = (user: User): ApiUser => ({
    id: user.id,
    email: user.email,
});
