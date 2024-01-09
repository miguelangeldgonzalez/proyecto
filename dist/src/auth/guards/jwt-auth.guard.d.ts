import { User } from 'src/user/entities/user.entity';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    constructor();
}
export interface JwtCreateUserReturn extends Request {
    user: {
        userId: number;
    };
}
export interface JwtUser extends User {
    iat: number;
    exp: number;
}
export {};
