import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
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
    }
})