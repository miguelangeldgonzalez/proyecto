import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}

export interface JwtCreateUserReturn extends Request {
    user: {
        userId: number;
    }
}

export interface JwtUser extends User {
    iat: number;
    exp: number;
}