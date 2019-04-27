import {EmailMassage} from "data/email/EmailMassage";

export abstract class IEmailSenderService {
    abstract send(mailTo: string, message: EmailMassage): Promise<void>;
}
