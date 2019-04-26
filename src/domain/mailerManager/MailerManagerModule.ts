import {Module} from '@nestjs/common';
import {EmailSenderModule} from 'data/emailService/EmailSenderModule';
import {IMailerManager} from 'domain/mailerManager/IMailerManager';
import {MailerManager} from 'domain/mailerManager/MailerManager';
import {StoresModule} from "data/database/stores/StoresModule";

@Module({
    imports: [EmailSenderModule, StoresModule],
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