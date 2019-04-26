import {EmailMassage} from "data/emailService/EmailMassage";

export abstract class IEmailSenderService {
    abstract send(mailTo:string,message: EmailMassage): Promise<void>;
}
