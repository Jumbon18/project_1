import {Module} from '@nestjs/common';
import {MailerModule} from '@nest-modules/mailer';
import {config} from "data/emailService/EmailSenderConfig";
import {IEmailSenderService} from "data/emailService/IEmailSenderService";
import {EmailSenderService} from "data/emailService/EmailSenderService";

const configuration = config.default;

@Module({
    imports: [
        MailerModule.forRoot(configuration),
    ],
    providers: [
        {
            provide: IEmailSenderService,
            useClass: EmailSenderService,
        },
    ],
    exports: [IEmailSenderService]
})
export class EmailSenderModule {}