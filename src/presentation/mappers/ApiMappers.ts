import Session from "entities/Session";
import ApiSession from "presentation/api/entities/Session";
import User from "entities/User";
import ApiUser from "presentation/api/entities/User";

export const mapApiSession = (session: Session): ApiSession => ({
    token: session.token,
    user: mapApiUser(session.user),
});

export const mapApiUser = (user: User): ApiUser => ({
    id: user.id,
    email: user.email,
});
