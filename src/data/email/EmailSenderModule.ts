import {Module} from '@nestjs/common';
import {MailerModule} from '@nest-modules/mailer';
import {config} from "data/email/EmailSenderConfig";
import {IEmailSenderService} from "data/email/IEmailSenderService";
import {EmailSenderService} from "data/email/EmailSenderService";

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