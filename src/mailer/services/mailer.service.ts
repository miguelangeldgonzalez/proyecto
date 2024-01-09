import { Inject, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerService {
    transporter: Transporter;

    constructor(
        @Inject('MAIL_CONFIG') private mailConfig: SMTPTransport.Options
    ) {
        this.transporter = createTransport(this.mailConfig);
    }

    async sendMailForCreateUser(to: string, token: string) {
        return await this.transporter.sendMail({
            from: this.mailConfig.auth.user,
            to,
            subject: 'Has sido registrado en Proyecto Sirena',
            text: `Bienvenido a Proyecto Sirena, verifica tu correo haciendo click en el siguiente enlace para verificar tu cuenta localhost:3000/${token}`,
        });
    }
}
