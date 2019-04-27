import {Injectable, ServiceUnavailableException} from '@nestjs/common';
import {IMailerManager} from 'domain/mailer/IMailerManager';
import {IEmailSenderService} from 'data/email/IEmailSenderService';

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
            throw new ServiceUnavailableException("Problem occurred when sending your password, please try again later.")
        }
    }
}
