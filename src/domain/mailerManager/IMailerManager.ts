export abstract class IMailerManager {
    abstract sendNewPassword(email: string): Promise<void>;
}
