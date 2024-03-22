import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export interface JwtUser extends User {
    iat: number;
    exp: number;
}
export interface JwtCreateUserReturn extends Request {
    user: {
        userId: number;
    };
}
export interface JwtForgotPasswordReturn extends Request {
    user: {
        email: string;
    };
}
export {};
