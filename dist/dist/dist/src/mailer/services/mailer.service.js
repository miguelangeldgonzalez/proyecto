"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const smtp_transport_1 = require("nodemailer/lib/smtp-transport");
let MailerService = class MailerService {
    constructor(mailConfig) {
        this.mailConfig = mailConfig;
        this.transporter = (0, nodemailer_1.createTransport)(this.mailConfig);
    }
    async sendMailForCreateUser(to, token) {
        return await this.transporter.sendMail({
            from: this.mailConfig.auth.user,
            to,
            subject: 'Has sido registrado en Proyecto Sirena',
            html: `Bienvenido a Proyecto Sirena <a href="https://proyecto-sirena.netlify.app/set-password?token=${token}">Verifica tu correo</a>`,
        });
    }
};
MailerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MAIL_CONFIG')),
    __metadata("design:paramtypes", [Object])
], MailerService);
exports.MailerService = MailerService;
//# sourceMappingURL=mailer.service.js.map