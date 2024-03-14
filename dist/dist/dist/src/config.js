"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => {
    return {
        postgres: {
            url: process.env.DATABASE_URL
        },
        jwtSecret: process.env.JWT_SECRET,
        mailer: {
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        }
    };
});
//# sourceMappingURL=config.js.map