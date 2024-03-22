import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
export declare class MailerService {
    private mailConfig;
    transporter: Transporter;
    constructor(mailConfig: SMTPTransport.Options);
    sendMailForCreateUser(to: string, token: string): Promise<any>;
    sendMailForPasswordRecover(to: string, token: string): Promise<any>;
}
