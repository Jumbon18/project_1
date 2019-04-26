import {Injectable} from '@nestjs/common';
import {MailerService} from '@nest-modules/mailer';
import {IEmailSenderService} from "data/emailService/IEmailSenderService";
import {EmailMassage} from "data/emailService/EmailMassage";

@Injectable()
export class EmailSenderService implements IEmailSenderService{
    constructor(private readonly mailerService: MailerService) {
    }

    public async send(mailTo: string, message: EmailMassage): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: mailTo, // sender address
                from: 'taraskozub20@gmail.com', // list of receivers
                subject: message.subject, // Subject line
                text: message.message, // plaintext body
                html: message.message, // HTML body content
            });
        } catch {

        }
    }
}