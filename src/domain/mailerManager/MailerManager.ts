import {Injectable} from '@nestjs/common';
import {IMailerManager} from 'domain/mailerManager/IMailerManager';
import {IEmailSenderService} from 'data/emailService/IEmailSenderService';
import IUserStore from "data/database/stores/IUserStore";
import ILoginStore from "data/database/stores/ILoginStore";
import PasswordUtils from "domain/mailerManager/PasswordUtils";
import {CryptoUtils} from "domain/auth/CryptoUtils";

@Injectable()
export class MailerManager implements IMailerManager {
    constructor(
        private readonly emailSenderService: IEmailSenderService,
        private readonly userStore: IUserStore,
        private readonly loginStore: ILoginStore,) {
    }

    public async sendNewPassword(email: string) {
        if (await this.userStore.findUser(email)) {
            const generatedPassword = PasswordUtils.generate();
            const {passwordHash, salt} = await CryptoUtils.hashPassword(generatedPassword);
            await this.emailSenderService.send(email, {
                subject: "FilmPass password recovery",
                message: `Your new password for FilmPass: ${generatedPassword}`
            });
            await this.loginStore.updateLocalLogin(email, {passwordHash, salt})
        }
    }
}
