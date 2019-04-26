import {Module} from '@nestjs/common';
import {EmailSenderModule} from 'data/email/EmailSenderModule';
import {IMailerManager} from 'domain/mailerManager/IMailerManager';
import {MailerManager} from 'domain/mailerManager/MailerManager';

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
export class MailerManagerModule{}