declare const _default: (() => {
    postgres: {
        url: string;
    };
    jwtSecret: string;
    mailer: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    postgres: {
        url: string;
    };
    jwtSecret: string;
    mailer: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
}>;
export default _default;
