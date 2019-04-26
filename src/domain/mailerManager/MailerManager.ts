import {Injectable} from '@nestjs/common';
import {IMailerManager} from 'domain/mailerManager/IMailerManager';
import {IEmailSenderService} from 'data/emailService/IEmailSenderService';

@Injectable()
export class MailerManager implements IMailerManager {
    constructor(
        private readonly emailSenderService: IEmailSenderService,) {
    }

    public async sendNewPassword(email: string, password: string) {
        try {
            await this.emailSenderService.send(email, {
                subject: "FilmPass password recovery",
                message: `Your new password for FilmPass: ${password}`
            });
        } catch (e) {

        }
    }
}
