import {Module} from '@nestjs/common';
import {EmailSenderModule} from 'data/email/EmailSenderModule';
import {IMailerManager} from 'domain/mailer/IMailerManager';
import {MailerManager} from 'domain/mailer/MailerManager';

@Module({
    imports: [EmailSenderModule],
    providers: [
        {
            provide: IMailerManager,
            useClass: MailerManager,
        },
    ],
    exports: [
        IMailerManager,
    ],
})
export class MailerModule {}
