import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

import { User } from 'src/user/entities/user.entity';
import { PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);

        if (isPublic) {
          return true;
        }
        
        return super.canActivate(context);
    }
}

/**
 * This is the decrypted user object that is returned by the JwtAuthGuard
 */
export interface JwtUser extends User {
    iat: number;
    exp: number;
}

/**
 * This is the structure that is returned by the request object when the user is created
 */
export interface JwtCreateUserReturn extends Request {
    user: {
        userId: number;
    }
}

/**
 * This is the structure that is returned by the request object when the user
 * requests a password reset
 */
export interface JwtForgotPasswordReturn extends Request {
    user: {
        email: string;
    }
}