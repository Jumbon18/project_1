export abstract class IMailerManager {
    abstract sendNewPassword(email: string, password: string): Promise<void>;
}
