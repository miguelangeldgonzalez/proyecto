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
            html: `Bienvenido a Proyecto Sirena <a href="https://proyecto-sirena.netlify.app/set-password?token=${token}">Verifica tu correo</a>`,
        });
    }

    async sendMailForPasswordRecover(to: string, token: string) {
        return await this.transporter.sendMail({
            from: this.mailConfig.auth.user,
            to,
            subject: 'Has olvidado tu contraseña',
            html: `Para recuperar tu contraseña <a href="https://proyecto-sirena.netlify.app/set-password?token=${token}&reseting-password=true">Ve a este enlace</a>`,
        });
    }

}
